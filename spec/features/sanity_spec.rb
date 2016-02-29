require "rails_helper"

RSpec.describe "The app works" do
  describe "if the home page", js: true do
    before { visit root_path }

    it "works" do
      expect(page).to have_content "Bizworld Educator Portal"
    end
  end
end
