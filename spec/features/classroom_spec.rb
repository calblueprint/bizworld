require "rails_helper"

RSpec.describe "The classroom page", js: true do
  let(:admin) { FactoryGirl.create :admin }
  let(:teacher1) { FactoryGirl.create :teacher }
  let(:classroom1) { FactoryGirl.create :classroom, teacher_id: teacher1.id }

  context "when logged in as admin" do
    before(:each) do
      visit root_path
      fill_in "email", with: admin.email
      fill_in "password", with: admin.password
      click_button "Login"
    end

    it "should be able to delete classroom", js: true do
      visit classroom_path(classroom1.id)
      click_on "Delete Classroom"

      within :css, ".modal-footer" do
        click_button "Yes, delete"
      end
    end
  end
end
