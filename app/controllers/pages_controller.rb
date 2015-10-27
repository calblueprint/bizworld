class PagesController < ApplicationController
  before_action :redirect_user, only: [:home]

  def home
  end

  def redirect_user
    if current_admin
      redirect_to classrooms_admins_path
    elsif current_teacher
      redirect_to teachers_path
    end
  end

  def states
    render json: {
      states: ISO3166::Country.find_country_by_name('United States').states.keys
    }
  end
end
