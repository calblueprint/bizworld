class AdminsController < ApplicationController
  before_filter :authenticate_admin!, :initialize_gon

  def classrooms
    @admin = current_admin
    respond_to do |format|
      format.html
      format.json do
        @classrooms = params[:status].empty? ? Classroom.all : Classroom.all.send(params[:status], params[:dates])
        render json: @classrooms, each_serializer: ClassroomSerializer, root: false
      end
    end
  end

  private

  def initialize_gon
    # TODO(nnarayen 10/7): remove gon example
    gon.current_user = current_admin
  end
end
