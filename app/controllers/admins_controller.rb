class AdminsController < ApplicationController
  before_filter :authenticate_admin!

  def classrooms
    @admin = current_admin
    respond_to do |format|
      format.html
      format.json do
        @classrooms = params[:status].empty? ? Classroom.all : Classroom.all.send(params[:status], params[:range])
        render json: @classrooms, each_serializer: ClassroomSerializer, root: false
      end
    end
  end
end
