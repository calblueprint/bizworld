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

  def submit
    form = Form.find(params[:form_id])
    responses = params[:responses] || {}
    if FormActions.validate(form, responses)
      FormActions.add_responses(form, responses, Student.find(params[:student]))
      render_json_message(:ok, message: "Assessment submitted!")
    else
      render_json_message(:forbidden, errors: ["No question can be left blank."])
    end
  end
end
