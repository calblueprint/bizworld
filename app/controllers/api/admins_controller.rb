module Api
  class AdminsController < Api::BaseController
    before_filter :authenticate_admin!

    def classrooms
      classrooms = filter_classrooms(params[:status], params[:range], params[:email])
      render json: classrooms, each_serializer: ClassroomSerializer, root: false
    end

    private

    def filter_classrooms(status, range, email)
      classrooms = status.empty? ? Classroom.all : Classroom.all.send(status, range)
      email.present? ? classrooms.by_teacher_email(email) : classrooms
    end
  end
end
