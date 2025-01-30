class PasswordController < ApplicationController
      skip_before_action :authorized
      skip_before_action :is_admin?
  # POST /password/forgot
  def forgot
    user = User.find_by(email: params[:email])

    if user
      user.generate_password_token!
      PasswordResetMailer.with(user: user).send_reset_email.deliver_now
      render json: { message: 'Password reset instructions sent to your email.' }, status: :ok
    else
      render json: { message: 'Email address not found.' }, status: :not_found
    end
  end

  # POST /password/reset
  def reset
    user = User.find_by(reset_password_token: params[:token])

    if user && user.password_token_valid?
      if user.reset_password!(params[:password])
        render json: { message: 'Password successfully updated.' }, status: :ok
      else
        render json: { message: 'Password reset failed.' }, status: :unprocessable_entity
      end
    else
      render json: { message: 'Invalid or expired token.' }, status: :not_found
    end
  end
end
