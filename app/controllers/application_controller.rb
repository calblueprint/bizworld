class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  # Devise authentication group for any signed in user
  devise_group :user, contains: [:teacher, :admin]

  def render_json_message(status, options = {})
    render json: {
      message: options[:message],
      to: options[:to],
      errors: options[:errors]
    }, status: status
  end
end
