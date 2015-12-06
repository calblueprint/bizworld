class TeachersController < ApplicationController
  before_action :authenticate_user!

  def classrooms
    @teacher = Teacher.find(params[:teacher_id])
  end

  def show
    @teacher = Teacher.find(params[:id])
  end
end
