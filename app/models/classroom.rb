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
#

class Classroom < ActiveRecord::Base
  has_many :students
  belongs_to :program
  belongs_to :teacher
  validates :name, presence: true

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

  def self.by_teacher_email(email)
    joins(:teacher).where(teachers: { email: email })
  end
end
