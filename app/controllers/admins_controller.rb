class AdminsController < ApplicationController
  before_filter :authenticate_admin!, :initialize_gon

  def classrooms
    @admin = current_admin
    @classrooms = Classroom.active(true)
    respond_to do |format|
      format.html
      format.json { render json: @classrooms, each_serializer: ClassroomSerializer, root: false }
    end
  end

  private

  def initialize_gon
    # TODO(nnarayen 10/7): remove gon example
    gon.current_user = current_admin
  end
end
