module Api
  class QuestionsController < Api::BaseController
    before_action :authenticate_admin!

    def update
      question = Question.find(params[:id])
      if update_question(question)
        render_json_message(:ok, data: { id: question.id }, message: "Question updated!")
      else
        render_json_message(:forbidden, errors: ["Question update failed."])
      end
    end

    def create
      question = Question.create(create_params)
      if question.save
        render_json_message(:ok, data: { id: question.id }, message: 'Question created!')
      else
        render_json_message(:forbidden, errors: question.errors.full_messages)
      end
    end

    def destroy
      question = Question.find(params[:id])
      if question.destroy
        render_json_message(:ok, message: 'Question deleted!')
      else
        render_json_message(:forbidden, errors: ['Failed to delete question.'])
      end
    end

    private

    def create_params
      params.permit(:form_id, :category, :options, :answer, :title, :number)
    end

    def update_question(question)
      params[:options].try(:each) do |option_id, option|
        question.options[option_id.to_i] = option
      end
      question.answer = params[:answer] if params.key?(:answer)
      question.title = params[:title] if params.key?(:title)
      question.save
    end
  end
end
