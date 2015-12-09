module Api
  class AdminsController < Api::BaseController
    before_filter :authenticate_admin!

    def classrooms
      classrooms = filter_classrooms(params[:status], params[:range],
                                     params[:teacher], params[:program_id])
      render json: classrooms, each_serializer: ClassroomSerializer, root: false
    end

    def download
      classrooms = params[:classrooms].map { |id| Classroom.find(id) }
      filename, file = CSVGenerator.create_zip(classrooms, Program.find(params[:program_id]))
      send_data(File.read(file.path), type: 'application/zip', filename: filename)
      cleanup_file(file)
    end

    private

    def filter_classrooms(status, range, teacher, program_id)
      classrooms = status.empty? ? Classroom.all : Classroom.all.send(status, range)
      classrooms = classrooms.by_teacher(teacher) if teacher.present?
      classrooms.by_program(program_id)
    end
  end
end
