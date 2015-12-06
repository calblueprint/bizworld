module Api
  class ProgramsController < Api::BaseController
    before_action :authenticate_user!

    def index
      render json: Program.all, each_serializer: ProgramSerializer, root: false
    end
  end
end
