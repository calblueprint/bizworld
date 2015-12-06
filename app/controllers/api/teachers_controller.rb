module Api
  class TeachersController < Api::BaseController
    before_action :authenticate_user!

    def classrooms
      teacher = Teacher.find(params[:teacher_id])
      render json: teacher.classrooms.send(params[:type]), each_serializer: ClassroomSerializer, root: false
    end

    def show
      render json: Teacher.find(params[:id]), serializer: TeacherSerializer, root: false
    end

    def update
      if Teacher.find(params[:id]).update(update_params)
        render_json_message(:ok, message: "Teacher Info successfully updated!")
      else
        render_json_message(:forbidden, errors: ["Teacher info update failed."])
      end
    end

    private

    def update_params
      params.permit(:first_name, :last_name, :email, :phone_number,
                    :school, :city, :state, grades: [])
    end
  end
end
