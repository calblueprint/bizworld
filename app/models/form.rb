# == Schema Information
#
# Table name: forms
#
#  id         :integer          not null, primary key
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  category   :string
#

class Form < ActiveRecord::Base
  has_one :program
  has_many :questions
end
