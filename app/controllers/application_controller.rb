class ApplicationController < ActionController::API
  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity
  rescue_from ActiveRecord::RecordNotFound, with: :render_record_not_found
  rescue_from ActionController::ParameterMissing, with: :render_bad_request
    include ActionController::Cookies
    before_action :authorized
    

      def encode_token(payload)
        JWT.encode(payload, 'password') 
    end

    def decoded_token
        header = request.headers['Authorization']
        if header
            token = header.split(" ")[1]
            begin
                JWT.decode(token, 'password')
            rescue JWT::DecodeError
                nil
            end
        end
    end

    def current_user 
        if decoded_token
            user_id = decoded_token[0]['user_id']
            @user = User.find_by(id: user_id)
        end
    end

    def is_admin?
      current_user&.admin?
    end

    def check_admin
      unless is_admin?
        render json: { error: 'Unauthorized access' }, status: :forbidden
      end
    end
    
    def authorized
        unless !!current_user
        render json: { message: 'Please log in' }, status: :unauthorized
        return
        end
    end

    def render_unprocessable_entity(invalid)
      render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
  end 

  def render_record_not_found
    render json: { error: "Record not found" }, status: :not_found
  end


  def render_bad_request(exception)
    render json: { error: exception.message }, status: :bad_request
  end

end
