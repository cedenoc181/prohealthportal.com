class PasswordResetMailer < ApplicationMailer
    default from: 'no-reply@yourapp.com'

    def send_reset_email(user)
      @user = user
      @token = @user.reset_password_token
      mail(to: @user.email, subject: 'Password Reset Instructions')
    end
end
