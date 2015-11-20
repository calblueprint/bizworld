# == Schema Information
#
# Table name: questions
#
#  id         :integer          not null, primary key
#  form_id    :integer
#  category   :integer
#  options    :string           default([]), is an Array
#  answer     :integer
#  title      :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  number     :integer
#

class Question < ActiveRecord::Base
  belongs_to :form
  has_many :responses

  validates :title, :category, :number, presence: true

  scope :gradeable, -> { where.not(answer: nil) }
end
