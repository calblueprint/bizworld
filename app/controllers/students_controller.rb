class StudentsController < ApplicationController
  before_action :authenticate_teacher!

  def create
    student = Student.create(student_params)
    if student.save
      render_json_message(:ok, message: 'Student successfully created!')
    else
      render_json_message(:forbidden, errors: student.errors.full_messages)
    end
  end

  private

  def student_params
    params.permit(:first_name, :last_name, :classroom_id)
  end
end
