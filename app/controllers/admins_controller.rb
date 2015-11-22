class AdminsController < ApplicationController
  before_filter :authenticate_admin!

  def classrooms
    @admin = current_admin
    respond_to do |format|
      format.html
      format.json do
        classrooms = filter_classrooms(params[:status], params[:range], params[:email])
        render json: classrooms, each_serializer: ClassroomSerializer, root: false
      end
    end
  end

  private

  def filter_classrooms(status, range, email)
    classrooms = status.empty? ? Classroom.all : Classroom.all.send(status, range)
    email.present? ? classrooms.by_teacher_email(email) : classrooms
  end
end
