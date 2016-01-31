module Api
  class FormsController < Api::BaseController
    def show
      render json: Form.find(params[:id]), serializer: FormSerializer, root: false
    end

    def submit
      form = Form.find(params[:form_id])
      student = Student.find(params[:student])
      responses = params[:responses] || {}
      if FormActions.validate(form, responses)
        FormActions.add_responses(form, responses, student)
        render_json_message(:ok, message: "Assessment submitted!",
                                 to: form_finished_path(form_id: form.id,
                                                        student_name: student.first_name))
      else
        render_json_message(:forbidden, errors: ["No question can be left blank."])
      end
    end
  end
end
