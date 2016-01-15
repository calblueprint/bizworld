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
#

FactoryGirl.define do
  factory :teacher do
    first_name "Json"
    last_name "Derulo"
    sequence(:school) { |n| "school#{n}" }
    sequence(:email) { |n| "teacher#{n}@bizworld.org" }
    password "password"
    password_confirmation "password"
  end
end
