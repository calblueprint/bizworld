class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  # Devise authentication group for any signed in user
  devise_group :user, contains: [:teacher, :admin]

  rescue_from CanCan::AccessDenied do
    redirect_to root_path
  end

  def redirect_user_path(resource)
    if resource.is_a?(Teacher)
      teacher_classrooms_path(resource)
    elsif resource.is_a?(Admin)
      admins_programs_path
    end
  end

  def render_json_message(status, options = {})
    render json: {
      data: options[:data],
      message: options[:message],
      to: options[:to],
      errors: options[:errors]
    }, status: status
  end

  def cleanup_file(file)
    file.close
    file.unlink
  end
end
