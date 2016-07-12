# == Schema Information
#
# Table name: teachers
#
#  id                     :integer          not null, primary key
#  email                  :string           default(""), not null
#  encrypted_password     :string           default(""), not null
#  reset_password_token   :string
#  reset_password_sent_at :datetime
#  remember_created_at    :datetime
#  sign_in_count          :integer          default(0), not null
#  current_sign_in_at     :datetime
#  last_sign_in_at        :datetime
#  current_sign_in_ip     :string
#  last_sign_in_ip        :string
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#  first_name             :string
#  last_name              :string
#  phone_number           :string
#  school                 :string
#  city                   :string
#  state                  :string
#  grades                 :string           default([]), is an Array
#  did_onboard            :boolean
#

class Teacher < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  has_many :classrooms
  validates :last_name, :first_name, :school, presence: true

  def self.classroom_csv_header
    ["Teacher Name", "Teacher Email", "Teacher ID"]
  end

  def classroom_csv_row
    ["#{first_name} #{last_name}",
     email,
     id]
  end

  def self.teacher_csv_header
    ["Teacher Name",
     "Teacher Email",
     "School",
     "City",
     "State",
     "Grade Levels"]
  end

  def teacher_csv_row
    [first_name + " " + last_name, email, school, city, state, grades.join(",")]
  end

  def onboarding?
    !did_onboard && classrooms.size == 1
  end
end
