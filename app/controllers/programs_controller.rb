class ProgramsController < ApplicationController
  def index
    @programs = Program.all
    respond_to do |format|
      format.json do
        render json: @programs, each_serializer: ProgramSerializer, root: false
      end
    end
  end
end
