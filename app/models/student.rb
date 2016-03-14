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
  has_many :responses, class_name: 'Response'

  validates :first_name, :last_name, presence: true

  def self.csv_header(category)
    # Generates header for student fields, header for responses is generated in program.rb
    ["Student Name", "Student ID", "#{category.capitalize}-Assessment Score"]
  end

  def csv_row(category)
    score = self[:"#{category}_score"] || "N/A"
    [full_name, id, score] + responses.by_category(category).sort_by(&:number).map(&:format)
  end

  private

  def full_name
    "#{first_name} #{last_name}"
  end
end
