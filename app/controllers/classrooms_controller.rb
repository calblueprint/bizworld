class ClassroomsController < ApplicationController
  load_and_authorize_resource
  before_action :authenticate_user!

  def show
    @classroom = Classroom.find(params[:id])
    gon.onboarding_image = ActionController::Base.helpers.image_path("onboarding.png")
  end
end
