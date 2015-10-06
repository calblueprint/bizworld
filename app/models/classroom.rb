# == Schema Information
#
# Table name: classrooms
#
#  id         :integer          not null, primary key
#  term       :string
#  module     :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  teacher_id :integer
#

class Classroom < ActiveRecord::Base
  has_many :students
  belongs_to :teacher
end
