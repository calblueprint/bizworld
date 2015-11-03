class FormsController < ApplicationController
  def display
    @category = params[:category]
    @classroom = Classroom.find(params[:classroom_id])
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
      render json: { message: "Assessment submitted!" }, status: :ok
    else
      render json: { message: "No question can be left blank" }, status: :forbidden
    end
  end
end
