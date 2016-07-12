# == Schema Information
#
# Table name: classrooms
#
#  id              :integer          not null, primary key
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  teacher_id      :integer
#  name            :string
#  program_id      :integer
#  start_date      :date
#  end_date        :date
#  pre_link        :string
#  post_link       :string
#  additional_info :string
#

class Classroom < ActiveRecord::Base
  include PgSearch

  has_many :students, dependent: :delete_all
  belongs_to :program
  belongs_to :teacher
  validates :name, presence: true

  after_create :create_links

  pg_search_scope :by_teacher,
    associated_against: {
      teacher: [:email, :first_name, :last_name]
    },
    using: {
      tsearch: { prefix: true }
    }

  def self.active(_options = {})
    where("end_date >= ? AND start_date <= ?", Date.current, Date.current)
  end

  def self.inactive(_options = {})
    where("end_date < ? OR start_date > ?", Date.current, Date.current)
  end

  def self.date_range(options)
    range = HashWithIndifferentAccess.new(Date.current).merge!(options || {})
    where("end_date <= ? AND start_date >= ?", range[:end].to_date, range[:start].to_date)
  end

  def self.csv_header
    ["Classroom Name", "Classroom ID"]
  end

  def csv_row
    [name, id]
  end

  def self.teacher_csv_header
    ["Classroom Name",
     "Classroom ID",
     "Start Date",
     "End Date",
     "Number of Students",
     "Average Pre",
     "Average Post",
     "Completed Pre",
     "Completed Post"]
  end

  def teacher_csv_row
    [name,
     id,
     start_date,
     end_date,
     students.length,
     average_score(:pre),
     average_score(:post),
     completed_assessments(:pre).count,
     completed_assessments(:post).count]
  end

  def create_links
    self.pre_link = UrlActions.shorten_url(id, :pre)
    self.post_link = UrlActions.shorten_url(id, :post)
    save
  end

  def self.by_program(program_id)
    where("program_id = ?", program_id)
  end

  def average_score(type)
    completed = completed_assessments(type)
    total = completed.map { |s| s.send("#{type}_score") }.reduce(:+)
    completed.count > 0 ? total / completed.count : 0
  end

  def completed_assessments(type)
    students.select { |s| s.send("#{type}_score").present? }
  end
end
