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
  has_many :responses, as: :responder

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
     "Start Date",
     "End Date",
     "Number of Students",
     "Average Pre",
     "Average Post",
     "Number Pre",
     "Number Post"]
  end

  def teacher_csv_row
    [name,
     start_date,
     end_date,
     students.length,
     average_pre,
     average_post,
     num_pre,
     num_post]
  end

  private

  def create_links
    self.pre_link = UrlActions.shorten_url(id, :pre)
    self.post_link = UrlActions.shorten_url(id, :post)
    save
  end

  def self.by_program(program_id)
    where("program_id = ?", program_id)
  end

  def average_pre
    count = students.count { |s| !s.pre_score.empty? }
    total = students.map { |s| s.pre_score.to_i }.reduce(:+)
    count > 0 ? total / count : 0
  end

  def num_pre
    students.count { |s| !s.pre_score.empty? }
  end

  def average_post
    count = students.count { |s| !s.post_score.empty? }
    total = students.map { |s| s.post_score.to_i }.reduce(:+)
    count > 0 ? total / count : 0
  end

  def num_post
    students.count { |s| !s.post_score.empty? }
  end
end
