module Api
  class AdminsController < Api::BaseController
    before_filter :authenticate_admin!

    def classrooms
      classrooms = filter_classrooms(params[:status], params[:range], params[:email])
      render json: classrooms, each_serializer: ClassroomSerializer, root: false
    end

    def download
      classrooms = params[:classrooms].map { |id| Classroom.find(id) }
      filename = 'classroom_responses.zip'
      temp_file = Tempfile.new(filename)
      begin
        CSVGenerator.create_zip(classrooms, temp_file)
        send_data(File.read(temp_file.path), type: 'application/zip', filename: filename)
      ensure
        cleanup_file(temp_file)
      end
    end

    private

    def cleanup_file(file)
      file.close
      file.unlink
    end

    def filter_classrooms(status, range, email)
      classrooms = status.empty? ? Classroom.all : Classroom.all.send(status, range)
      email.present? ? classrooms.by_teacher_email(email) : classrooms
    end
  end
end
