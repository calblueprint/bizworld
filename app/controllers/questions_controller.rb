class QuestionsController < ApplicationController
  before_action :authenticate_admin!, only: [:update]

  def update
    if update_question(Question.find(params[:id]), params[:options], params[:title])
      render_json_message(:ok, message: "Question updated!")
    else
      render_json_message(:forbidden, errors: ["Question update failed."])
    end
  end

  private

  def update_question(question, options, title)
    options.try(:each) do |option_id, option|
      question.options[option_id.to_i] = option
    end
    question.title = title if title.present?
    question.save
  end
end
