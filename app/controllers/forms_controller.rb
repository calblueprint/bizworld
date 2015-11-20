class FormsController < ApplicationController
  def display
    @category = params[:category]
    @classroom = Classroom.find(params[:classroom_id])
    @teacher = Teacher.find(@classroom.teacher_id)
    @program = Program.find(@classroom.program_id)
    @form = @classroom.program.send(@category)
  end

  def show
    @form = Form.find(params[:id])
    respond_to do |format|
      format.html
      format.json { render json: @form, serializer: FormSerializer, root: false }
    end
  end

  def submit
    form = Form.find(params[:form_id])
    responses = params[:responses] || {}
    if FormActions.validate(form, responses)
      FormActions.add_responses(form, responses, Student.find(params[:student]))
      render_json_message(:ok, message: "Assessment submitted!")
    else
      render_json_message(:forbidden, errors: ["No question can be left blank"])
    end
  end
end
