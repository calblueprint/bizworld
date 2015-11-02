# == Schema Information
#
# Table name: classrooms
#
#  id         :integer          not null, primary key
#  term       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  teacher_id :integer
#  program_id :integer
#  name       :string
#  start_date :date
#  end_date   :date
#

class Classroom < ActiveRecord::Base
  belongs_to :program
  has_many :students
  belongs_to :teacher

  def self.get_date_range(options)
    Hash.new(Date.current).merge!(options || {})
  end

  def self.active(options = {})
    active_dates = get_date_range(options)
    where("end_date >= ? AND start_date <= ?", active_dates[:start], active_dates[:end])
  end

  def self.inactive(options = {})
    inactive_dates = get_date_range(options)
    where("end_date < ? OR start_date > ?", inactive_dates[:start], inactive_dates[:end])
  end
end
