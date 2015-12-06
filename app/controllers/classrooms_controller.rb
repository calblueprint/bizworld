class ClassroomsController < ApplicationController
  before_action :authenticate_user!

  def show
    @classroom = Classroom.find(params[:id])
  end
end
