module Api
  class TeachersController < Api::BaseController
    before_action :authenticate_user!

    def classrooms
      teacher = Teacher.find(params[:teacher_id])
      classrooms = filter_classrooms(params[:type], params[:program_id])
      render json: classrooms, each_serializer: ClassroomListItemSerializer, root: false
    end

    def show
      render json: Teacher.find(params[:id]), serializer: TeacherSerializer, root: false
    end

    def update
      if Teacher.find(params[:id]).update(update_params)
        if params[:did_onboard]
          render_json_message(:ok, message: "Completed Tutorial!")
        else
          render_json_message(:ok, message: "Teacher Info successfully updated!")
        end
      else
        render_json_message(:forbidden, errors: ["Teacher info update failed."])
      end
    end

    private

    def update_params
      params.permit(:first_name, :last_name, :email, :phone_number, :did_onboard,
                    :school, :city, :state, grades: [])
    end

    def filter_classrooms(type, program_id)
      teacher = Teacher.find(params[:teacher_id])
      classrooms = teacher.classrooms.send(type)
      program_id.empty? ? classrooms : classrooms.by_program(program_id)
    end
  end
end
