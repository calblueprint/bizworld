class TeachersController < ApplicationController
  before_action :authenticate_user!
  load_and_authorize_resource
  skip_authorize_resource only: :classrooms # skip here, manually pass Teacher model to ccc below

  def classrooms
    @teacher = Teacher.find(params[:teacher_id])
    authorize! :read_classrooms, @teacher # manually pass Teacher model or ccc gets confused
  end

  def show
    @teacher = Teacher.find(params[:id])
  end

  def edit_teacher_password_url
    `/passwords/update`
  end
end
