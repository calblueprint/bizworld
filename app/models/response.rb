# == Schema Information
#
# Table name: responses
#
#  id          :integer          not null, primary key
#  question_id :integer
#  student_id  :integer
#  answer      :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Response < ActiveRecord::Base
  belongs_to :student
  belongs_to :question

  validates :answer, presence: true
end
