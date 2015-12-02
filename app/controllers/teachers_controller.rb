class TeachersController < ApplicationController
  before_action :authenticate_user!, only: :show

  # GET /teachers/:id/classrooms
  def classrooms
    @teacher = Teacher.find(params[:id])
    respond_to do |format|
      format.html
      format.json do
        render json: @teacher.classrooms.send(params[:type]), each_serializer: ClassroomSerializer, root: false
      end
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
