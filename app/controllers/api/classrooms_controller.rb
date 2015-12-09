module Api
  class ClassroomsController < Api::BaseController
    def create
      classroom = Classroom.create(create_params)
      if classroom.save
        render_json_message(:ok, message: 'Classroom created!', to: classroom_path(classroom))
      else
        render_json_message(:forbidden, errors: classroom.errors.full_messages)
      end
    end

    def show
      @classroom = Classroom.find(params[:id])
      render json: @classroom, serializer: ClassroomSerializer, root: false
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

    def download
      classroom = Classroom.find(params[:classroom_id])
      filename, file = CSVGenerator.create_zip([classroom], classroom.program)
      send_data(File.read(file.path), type: 'application/zip', filename: filename)
      cleanup_file(file)
    end

    def destroy
      classroom = Classroom.find(params[:id])
      if classroom.destroy
        render_json_message(:ok, message: 'Successfully deleted classroom!',
                                 to: teacher_classrooms_path(current_teacher))
      else
        render_json_message(:forbidden, errors: classroom.errors.full_messages)
      end
    end

    private

    def attempt_upload(roster, students)
      roster.each(first_name: "First Name", last_name: "Last Name").with_index
        .reject { |_, index| index == 0 }
        .map    { |data, _| students << Student.create!(data) }
      Classroom.find(params[:classroom_id]).update!(students: students)
      render_json_message(:ok, message: "Roster uploaded successfully!")
    end

    def create_params
      params.permit(:name, :program_id, :teacher_id, :start_date, :end_date)
    end

    def update_params
      params.permit(:name, :start_date, :end_date)
    end
  end
end
