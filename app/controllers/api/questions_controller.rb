module Api
  class QuestionsController < Api::BaseController
    before_action :authenticate_admin!

    def update
      if update_question(Question.find(params[:id]))
        render_json_message(:ok, message: "Question updated!")
      else
        render_json_message(:forbidden, errors: ["Question update failed."])
      end
    end

    private

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
