# == Schema Information
#
# Table name: classroom_additional_questions
#
#  id         :integer          not null, primary key
#  title      :string
#  hint       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class ClassroomAdditionalQuestion < ActiveRecord::Base
end
