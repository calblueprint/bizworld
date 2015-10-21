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
#

class Classroom < ActiveRecord::Base
  belongs_to :program
  has_many :students
  belongs_to :teacher

  def self.active(is_active)
    if is_active
      where("end_date >= ? AND start_date <= ?", Date.current, Date.current)
    else
      where("end_date < ? OR start_date > ?", Date.current, Date.current)
    end
  end
end
