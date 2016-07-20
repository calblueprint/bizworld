class AdminsController < ApplicationController
  before_action :authenticate_admin!

  def classrooms
    @admin = current_admin
    @program = Program.find(params[:id])
  end
end
