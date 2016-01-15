class ClassroomsController < ApplicationController
  load_and_authorize_resource
  before_action :authenticate_user!

  def show
    @classroom = Classroom.find(params[:id])
  end
end
