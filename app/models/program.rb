# == Schema Information
#
# Table name: programs
#
#  id         :integer          not null, primary key
#  name       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  pre_id     :integer
#  post_id    :integer
#  is_active  :boolean          default(TRUE), not null
#

class Program < ActiveRecord::Base
  has_many :classrooms
  belongs_to :pre, class_name: "Form"
  belongs_to :post, class_name: "Form"

  before_create :make_forms

  scope :active, -> { where(is_active: true) }
  scope :inactive, -> { where(is_active: false) }

  validates_uniqueness_of :name
  validates_presence_of :name

  def make_forms
    self.pre = Form.create(category: 'pre')
    self.post = Form.create(category: 'post')
  end

  def csv_header(category)
    send(category).questions.order(:id).pluck(:title)
  end

  def self.teacher_csv_header
    ["Program Name"]
  end

  def teacher_csv_row
    [name]
  end
end
