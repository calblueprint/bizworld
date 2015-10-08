# == Schema Information
#
# Table name: programs
#
#  id         :integer          not null, primary key
#  name       :string
#  pre        :string
#  post       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Program < ActiveRecord::Base
  has_many :classrooms
end
