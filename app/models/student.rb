# == Schema Information
#
# Table name: students
#
#  id           :integer          not null, primary key
#  first_name   :string
#  last_name    :string
#  pre_score    :float
#  post_score   :float
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  classroom_id :integer
#

class Student < ActiveRecord::Base
  belongs_to :classroom
  has_many :responses
end
