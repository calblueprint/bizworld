class RegistrationsController < Devise::RegistrationsController
  before_filter :configure_permitted_parameters, only: [:create]

  respond_to :json

  def create
    build_resource(sign_up_params)
    if resource.save
      sign_in(resource_name, resource)
      render_json_message(:ok, message: 'Account created!', to:
                          redirect_user_path(resource))
    else
      clean_up_passwords resource
      render_json_message(:forbidden, errors: resource.errors.full_messages)
    end
  end

  def password_update
    @model = current_user.is_a?(Admin) ? :admin : :teacher
    @user_id = current_user.id
  end

  def password_reset
    @token = params[:reset_password_token]
    @model = request.path == edit_admin_password_path ? :admins : :teachers
  end

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.for(:sign_up) do |u|
      u.permit(:email, :password, :password_confirmation, :first_name,
               :last_name, :phone_number, :school, :city, :state, grades: [])
    end
  end
end
