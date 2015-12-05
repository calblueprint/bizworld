class ClassroomsController < ApplicationController
  before_action :authenticate_user!, if: proc { request.format.html? }

  def create
    classroom = Classroom.create(classroom_params)
    if classroom.save
      render_json_message(:ok, message: 'Classroom created!', to: classroom_path(classroom))
    else
      render_json_message(:forbidden, errors: classroom.errors.full_messages)
    end
  end

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
    classroom = Classroom.find(params[:id])
    if classroom.update(update_params)
      render_json_message(:ok, message: "Classroom successfully updated!")
    else
      render_json_message(:forbidden, errors: classroom.errors.full_messages)
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

  def classroom_params
    params.permit(:name, :program_id, :teacher_id, :start_date, :end_date)
  end

  def update_params
    params.permit(:name, :start_date, :end_date)
  end
end
