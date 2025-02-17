class ApplicationController < ActionController::API

    include ActionController::Cookies

    before_action :authorized
    before_action :is_admin?
    
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity
    rescue_from ActiveRecord::RecordNotFound, with: :render_record_not_found
    rescue_from ActionController::ParameterMissing, with: :render_bad_request


      def encode_token(payload)
        payload[:exp] = 1.hours.from_now.to_i 
        JWT.encode(payload, 'password', 'HS256')
      rescue StandardError => e
        Rails.logger.error "🚨 JWT Encoding Error: #{e.message}"
        nil
      end

      def decoded_token
        if cookies.encrypted[:auth_token] || request.headers['Authorization']
          token = cookies.encrypted[:auth_token] || request.headers['Authorization'].split(' ')[1]
          
          begin
            decoded = JWT.decode(token, 'password', true, { algorithm: 'HS256' })
              Rails.logger.debug "✅ JWT Decoded Successfully: #{decoded}"
              decoded
          rescue JWT::DecodeError
              Rails.logger.warn "🚨 JWT Decode Error: #{e.message}"
            nil
          rescue JWT::ExpiredSignature
            Rails.logger.warn "🚨 JWT Expired Signature: Token is no longer valid."
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
      unless current_user&.admin?
        render json: { message: "You must be an admin to perform this action."}, status: :unauthorized
        return
      end
    end
    
    def authorized
        unless current_user
        render json: { message: 'Please log in' }, status: :unauthorized
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
