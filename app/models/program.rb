# == Schema Information
#
# Table name: programs
#
#  id         :integer          not null, primary key
#  name       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  pre_id     :integer
#  post_id    :integer
#

class Program < ActiveRecord::Base
  has_many :classrooms
  belongs_to :pre, class_name: "Form"
  belongs_to :post, class_name: "Form"

  def csv_header(category)
    send(category).questions.order(:id).pluck(:title)
  end
end
