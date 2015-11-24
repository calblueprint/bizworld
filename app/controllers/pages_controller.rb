class PagesController < ApplicationController
  before_action :redirect_user, only: [:home]

  def home
  end

  def states
    render json: {
      states: ISO3166::Country.find_country_by_name('United States').states.keys
    }
  end

  private

  def redirect_user
    redirect_to redirect_user_path(current_user) if current_user
  end
end
