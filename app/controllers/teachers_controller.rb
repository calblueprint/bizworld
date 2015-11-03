class TeachersController < ApplicationController
  before_action :authenticate_user!, only: :show

  # GET /teachers/:id/classrooms
  def classrooms
    @teacher = Teacher.find(params[:id])
    respond_to do |format|
      format.html
      format.json { render json: @teacher.classrooms, each_serializer: ClassroomSerializer, root: false }
    end
  end

  # GET /teachers/:id
  def show
    @teacher = Teacher.find(params[:id])
    respond_to do |format|
      format.html
      format.json { render json: @teacher, serializer: TeacherSerializer, root: false }
    end
  end
end
