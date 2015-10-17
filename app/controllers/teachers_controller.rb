class TeachersController < ApplicationController
  before_action :authenticate_user!
end
