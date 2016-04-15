module Api
  class QuestionsController < Api::BaseController
    before_action :authenticate_admin!

    def update
      question = Question.find(params[:id])
      if update_question(question)
        render_json_message(:ok, data: { question: question }, message: "Question updated!")
      else
        render_json_message(:forbidden, errors: ["Question update failed."])
      end
    end

    def create
      question = Question.create(create_params[:question].merge!(number: new_question_number))
      question.options.reject!(&:empty?)
      if question.save
        render_json_message(:ok, data: { question: question }, message: 'Question created!')
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

    def new_question_number
      return 0 if params[:insert_after].empty?
      Question.find(params[:insert_after]).number + 1
    end

    def create_params
      params.permit(:insert_after,
                    question: [:form_id, :category, { options: [] }, :answer, :title, :number])
    end

    def update_question(question)
      question.options = params[:options].reject(&:empty?) if params.key?(:options)
      if params.key?(:answer)
        question.answer = (params[:answer] == '-1') ? nil : params[:answer]
      end
      question.category = params[:category] if params.key?(:category)
      question.title = params[:title] if params.key?(:title)
      question.save
    end
  end
end
