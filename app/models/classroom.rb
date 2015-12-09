# == Schema Information
#
# Table name: classrooms
#
#  id         :integer          not null, primary key
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  teacher_id :integer
#  name       :string
#  program_id :integer
#  start_date :date
#  end_date   :date
#  pre_link   :string
#  post_link  :string
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
    %w(classroom_name classroom_id)
  end

  def csv_row
    [name, id]
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
end
