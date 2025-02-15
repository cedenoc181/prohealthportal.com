require 'rails_helper'

RSpec.describe ApplicationController, type: :controller do
  controller do  
        def encode_example
          render json: { token: encode_token({ user_id: 1 }) }
        end

        def decode_example
          render json: { decoded: decoded_token }
        end

  end

  before do
        routes.draw do
            get "encode_example", to: "anonymous#encode_example"
            get "decode_example", to: "anonymous#decode_example"
          end
    end


  let(:token) { JWT.encode({ user_id: 1 }, 'password', 'HS256') }

  describe "#encode_token" do
        it "encodes a token correctly" do
          get :encode_example  # ✅ Calls the method inside the controller
          json_response = JSON.parse(response.body)
          expect(json_response["token"]).not_to be_nil
        end
  end

  describe "#decode_token" do
    it "decodes a valid token" do
      request.headers["Authorization"] = "Bearer #{token}"
      get :decode_example  # ✅ Calls the method inside the controller
      json_response = JSON.parse(response.body)
      expect(json_response["decoded"][0]["user_id"]).to eq(1)
    end
  end
  
end
