class ApplicationController < ActionController::API
    include ActionController::Cookies

    def hello_world
        session[:count] = (session[:count] || 0) + 1
        render json: { count: session[:count] }
      end
      #test
      def yer 
        render json: {Christian: "what up gansta"}
      end
end
