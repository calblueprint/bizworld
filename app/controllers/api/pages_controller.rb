module Api
  class PagesController < Api::BaseController
    def states
      render json: {
        states: ISO3166::Country.find_country_by_name('United States').states.keys
      }
    end
  end
end
