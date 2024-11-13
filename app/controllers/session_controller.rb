class SessionController < ApplicationController
    # skip_before_action :authorized
    skip_before_action :is_admin?
  
    rescue_from ActiveRecord::RecordNotFound, with: :invalid_email
  
    def login
      @user = User.find_by!(email: login_params[:email].downcase)
      if @user.authenticate(login_params[:password])
        @token = encode_token(user_id: @user.id)
  
        # Store user info in session and token in cookies
        # session[:user_id] = @user.id
        cookies.encrypted[:auth_token] = {
          value: @token,
          expires: 1.week.from_now,
          httponly: true # Prevents JS access to the cookie (for security)
        }
  
        render json: {
          user: UserSerializer.new(@user),
          token: @token
        }, status: :accepted
      else
        render json: { message: 'Incorrect password' }, status: :unauthorized
      end
    end
  
    def logout
      # Clear session and cookies on logout
    #   reset_session
      cookies.delete(:auth_token)
      render json: { message: 'Logged out successfully' }, status: :ok
    end
  
    private
  
    def login_params
      params.permit(:email, :password)
    end
  
    def invalid_email
      render json: { message: 'Invalid email' }, status: :unauthorized
    end
  end
  