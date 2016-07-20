module Api
  class ProgramsController < Api::BaseController
    before_action :authenticate_user!
    before_action :authenticate_admin!, only: [:create, :update]

    def index
      render json: Program.send(params[:type]), each_serializer: ProgramSerializer, root: false
    end

    def update
      program = Program.find(params[:id])
      if !program.nil? && program.update(update_params)
        render_json_message(:ok, message: "Program status successfully updated!", data: program)
      else
        render_json_message(:forbidden, errors: ["Unable to update program status."])
      end
    end

    def create
      program = Program.create(create_params)
      if program.errors.messages.empty?
        render_json_message(:ok, message: "Program successfully created!")
      else
        messages = produce_error_messages program.errors
        render_json_message(:forbidden, errors: messages)
      end
    end

    private

    def update_params
      params.permit(:is_active)
    end

    def create_params
      params.permit(:name)
    end

    def produce_error_messages(error)
      message_strings = []
      error.messages.keys.each do |key|
        k_string = key.to_s.humanize
        message_strings += error.messages[key].collect { |m| (k_string + ' ' + m + '.') }
      end
      message_strings
    end
  end
end
