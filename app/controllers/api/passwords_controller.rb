module Api
  class PasswordsController < Api::BaseController
    before_action :authenticate_user!

    def update
      user = user_from_params
      password_errors = accumulate_password_errors user

      if !password_errors.blank?
        render_json_message(:forbidden, errors: password_errors)
      elsif user.update(update_params.except!(:old_password))
        render_json_message(:ok, message: "Password updated", to: redirect_user_path(user))
        sign_in(user, bypass: true)
      else
        render_json_message(:internal_server_error, errors: ["An unknown error occurred."])
      end
    end

    private

    def update_params
      params.permit(:old_password, :password, :password_confirmation)
    end

    def user_from_params
      if params[:model] == "admin"
        Admin.find(params[:id])
      elsif params[:model] == "teacher"
        Teacher.find(params[:id])
      end
    end

    def accumulate_password_errors(user)
      errors = []
      if !user.valid_password?(params[:old_password])
        errors.push("Current password incorrect.")
      elsif params[:password] != params[:password_confirmation]
        errors.push("Passwords do not match.")
      elsif params[:password].length < Devise.password_length.min
        errors.push("New password is too short.")
      elsif params[:password].length > Devise.password_length.max
        errors.push("New password is too long.")
      end
    end
  end
end
