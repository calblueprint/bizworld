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
#  category    :string
#

class Response < ActiveRecord::Base
  belongs_to :student
  belongs_to :question

  validates :answer, presence: true

  def self.by_category(category)
    where("category = ?", category)
  end

  def number
    question.number
  end

  def format
    if question.answer
      answer_text = question.options[question.answer]
      (question.answer == answer.to_i) ? "Correct : #{answer_text}" : "Incorrect : #{answer_text}"
    else
      question.options.present? ? question.options[answer.to_i] : answer
    end
  end
end
