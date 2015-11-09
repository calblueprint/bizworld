class SessionsController < Devise::SessionsController
  respond_to :json

  def create
    self.resource, resource_name = authenticate(auth_options, :teacher)
    set_flash_message(:notice, :signed_in) if is_navigational_format?
    sign_in(resource_name, resource)
    render json: {
      message: "Login successful!",
      to: after_sign_in_path_for(resource)
    }, status: :ok
  end

  # Attempts to authenticate the login request, first as a Teacher and
  # then as an Admin.
  def authenticate(auth_options, resource_name)
    # First login attempt using Teacher scope
    resource = warden.authenticate(auth_options)

    # If authentication failed, retry using Admin scope
    if resource.nil?
      resource_name = :admin
      request.params[:admin] = params[:teacher]
      resource = warden.authenticate!(auth_options.merge(scope: :admin))
    end

    # Return resource and resource name, required for Devise sign_in method
    [resource, resource_name]
  end

  def after_sign_in_path_for(resource)
    resource.is_a?(Teacher) ? classrooms_teacher_path(resource) : classrooms_admins_path
  end

  def destroy
    sign_out(resource)
    redirect_to root_path
  end

  def failure
    warden.custom_failure!
    render json: { message: "Inavlid email and password combination" }, status: :unauthorized
  end

  protected

  def auth_options
    { scope: resource_name, recall: "#{controller_path}#failure" }
  end
end
