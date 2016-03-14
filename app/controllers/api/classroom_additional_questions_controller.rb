module Api
  class ClassroomAdditionalQuestionsController < Api::BaseController
    def create
      additional_question = ClassroomAdditionalQuestion.create(create_params)
      if additional_question.save
        render_json_message(:ok, message: 'Question created!')
      else
        render_json_message(:forbidden, errors: additional_question.errors.full_messages)
      end
    end

    def update
      additional_question = ClassroomAdditionalQuestion.find(params[:id])
      if additional_question.update(update_params)
        render_json_message(:ok, message: "Question successfully updated!")
      else
        render_json_message(:forbidden, errors: additional_question.errors.full_messages)
      end
    end

    def destroy
      additional_question = ClassroomAdditionalQuestion.find(params[:id])
      if additional_question.destroy
        render_json_message(:ok, message: 'Question successfully deleted!')
      else
        render_json_message(:forbidden, errors: question.errors.full_messages)
      end
    end

    private

    def create_params
      params.permit(:title, :hint)
    end

    def update_params
      params.permit(:title, :hint)
    end
  end
end
