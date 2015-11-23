class ClassroomsController < ApplicationController
  before_action :authenticate_user!, if: proc { request.format.html? }

  def show
    @classroom = Classroom.find(params[:id])
    respond_to do |format|
      format.html
      format.json { render json: @classroom, serializer: ClassroomSerializer, root: false }
    end
  end

  def upload
    roster = Roo::Spreadsheet.open(params[:file].path)
    students = []
    begin
      attempt_upload(roster, students)
    rescue
      students.map { |student, _| student.destroy }
      render_json_message(:forbidden, errors: ["Roster upload failed."])
    end
  end

  def update
    if Classroom.find(params[:id]).update!(update_params)
      render json: {
        message: 'Classroom successfully updated!'
      }, status: :ok
    else
      render json: {
        message: 'Classroom update failed.'
      }, status: :forbidden
    end
  end

  private

  def attempt_upload(roster, students)
    roster.each(first_name: "First Name", last_name: "Last Name").with_index
      .reject { |_, index| index == 0 }
      .map    { |data, _| students << Student.create!(data) }
    Classroom.find(params[:id]).update!(students: students)
    render_json_message(:ok, message: "Roster uploaded successfully!")
  end

  def update_params
    params.permit(:name, :start_date, :end_date)
  end
end
