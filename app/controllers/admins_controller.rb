class AdminsController < ApplicationController
  # TODO(nnarayen 10/1): update stubbed method
  def index
    @partners = Partner.all
  end
end
