class PasswordResetMailer < ApplicationMailer
    default from: 'christiancedenob.f@gmail.com'

    def send_reset_email
      @user = params[:user]  # Fetch the user from params when using .with
      @token = @user.reset_password_token
      mail(to: @user.email, subject: 'Password Reset Instructions')
    end
end

# admin user is cedenoc181 Bronco2527!
