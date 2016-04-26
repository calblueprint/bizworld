module Api
  class ProgramsController < Api::BaseController
    before_action :authenticate_user!

    def index
      render json: Program.active, each_serializer: ProgramSerializer, root: false
    end

    def update
      program = Program.find(params[:id])
      if !current_admin.nil? && !program.nil? && program.update(update_params)
        render_json_message(:ok, message: "Program status successfully updated!", data: program)
      else
        render_json_message(:forbidden, errors: ["Unable to update program status."])
      end
    end

    def create
      if !current_admin.nil? && Program.create(create_params)
        render_json_message(:ok, message: "Program successfully created!")
      else
        render_json_message(:forbidden, errors: ["Unable to update program status."])
      end
    end

    private

    def update_params
      params.permit(:is_active)
    end

    def create_params
      params.permit(:name, :color, :icon)
    end
  end
end
