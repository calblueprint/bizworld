module Api
  class AdminsController < Api::BaseController
    before_action :authenticate_admin!

    def classrooms
      classrooms = filter_classrooms(filter_params.symbolize_keys)
      render json: classrooms, each_serializer: ClassroomSerializer, root: false
    end

    def download_classrooms
      classrooms = params[:classrooms].map { |id| Classroom.find(id) }
      program = Program.find(params[:program_id])
      filename, file = ClassroomCSVGenerator.create_zip(classrooms, program)
      send_and_cleanup_file(file, filename)
    end

    def download_teachers
      classrooms = params[:classrooms].map { |id| Classroom.find(id) }
      program = Program.find(params[:program_id])
      filename, file = TeacherCSVGenerator.create_zip(classrooms, program)
      send_and_cleanup_file(file, filename)
    end

    private

    def filter_classrooms(status:, program_id:, teacher: nil, range: nil)
      classrooms = status.empty? ? Classroom.all : Classroom.all.send(status, range)
      classrooms = classrooms.by_teacher(teacher) if teacher.present?
      classrooms.by_program(program_id)
    end

    def filter_params
      params.permit(:status, :program_id, :teacher, range: [:start, :end])
    end

    def send_and_cleanup_file(file, filename)
      send_data(File.read(file.path), type: 'application/zip', filename: filename)
      cleanup_file(file)
    end
  end
end
