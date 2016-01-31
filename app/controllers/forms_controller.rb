class FormsController < ApplicationController
  before_action :authenticate_admin!, only: [:show]

  def display
    @category = params[:category]
    @classroom = Classroom.find(params[:classroom_id])
    @teacher = Teacher.find(@classroom.teacher_id)
    @program = @classroom.program
    @form = @program.send(@category)
  end

  def show
    @form = Form.find(params[:id])
    @program = @form.program
  end

  def finished
    @form = Form.find(params[:form_id])
    @program = @form.program
    @student_name = params[:student_name]
  end
end
