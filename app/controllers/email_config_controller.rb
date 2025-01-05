class EmailConfigController < ApplicationController
    
    def index
        render json: {
          service_id: ENV["EMAILJS_SERVICE_ID"],
          public_key: ENV["EMAILJS_PUBLIC_KEY"],
          template_id: ENV["EMAILJS_TEMPLATE_ID"]
        }
      end
end
