class RegistrationsController < Devise::RegistrationsController
  before_filter :configure_permitted_parameters, only: [:create]

  respond_to :json

  def create
    build_resource(sign_up_params)
    if resource.save
      sign_in(resource_name, resource)
      render_json_message('Account created!', :ok,
                          after_sign_up_path_for(resource), nil)
    else
      clean_up_passwords resource
      render_json_message('Account creation failed', :forbidden, nil,
                          resource.errors.full_messages)
    end
  end

  def after_sign_up_path_for(resource)
    resource.is_a?(Teacher) ? classrooms_teacher_path(resource) : classrooms_admins_path
  end

  def render_json_message(message, status, to, errors)
    render json: {
      message: message,
      to: to,
      errors: errors
    }, status: status
  end

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.for(:sign_up) do |u|
      u.permit(:email, :password, :password_confirmation, :first_name,
               :last_name, :phone_number, :school, :city, :state, grades: [])
    end
  end
end
