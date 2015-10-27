class TeachersController < ApplicationController
  before_action :authenticate_user!, only: :show

  # GET /teachers/1/classrooms
  def classrooms
    @teacher = Teacher.find(params[:id])
    respond_to do |format|
      format.html
      format.json { render json: @teacher.classrooms, each_serializer: ClassroomSerializer, root: false }
    end
  end

  # GET /teachers/1
  def show
    @teacher = Teacher.find(params[:id])
  end
end
