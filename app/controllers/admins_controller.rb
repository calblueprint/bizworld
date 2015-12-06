class AdminsController < ApplicationController
  before_filter :authenticate_admin!

  def classrooms
    @admin = current_admin
  end
end
