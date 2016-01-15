# == Schema Information
#
# Table name: classrooms
#
#  id         :integer          not null, primary key
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  teacher_id :integer
#  name       :string
#  program_id :integer
#  start_date :date
#  end_date   :date
#  pre_link   :string
#  post_link  :string
#

FactoryGirl.define do
  factory :classroom do
    sequence(:name) { |n| "classroom#{n}" }

    after(:build) do |classroom|
      allow(classroom).to receive(:create_links).and_return(true)
    end
  end
end
