class ClassroomsController < ApplicationController
  before_action :authenticate_user!

  def show
    @classroom = Classroom.find(params[:id])
    respond_to do |format|
      format.html
      format.json { render json: @classroom, serializer: ClassroomSerializer, root: false }
    end
  end
end
