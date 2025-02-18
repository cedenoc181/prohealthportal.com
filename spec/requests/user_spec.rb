require 'rails_helper'

RSpec.describe "Users", type: :request do

  include ActionDispatch::TestProcess

  # default clinics, users, and token

  let!(:clinic) { Clinic.create!(clinic_location_name: "East", clinic_location_address: "1041 3rd ave")}

  let!(:user) {
    User.create!(
      email: "user@example.com",
      password: "password",
      first_name: "christian",
      last_name: "cedeno",
      clinic_id: clinic.id,
      admin: true
    )
  }

  let!(:test_user) {
    User.create!(
      email: "test_user@example.com",
      password: "password",
      first_name: "example test user",
      last_name: "example test user",
      clinic_id: clinic.id,
      admin: false
    )
  }
   # non admin token
  let(:test_token) { JWT.encode({user_id: test_user.id},'password', 'HS256')}
    # admin's token
  let(:token) { JWT.encode({ user_id: user.id }, 'password', 'HS256')}

  describe "POST/ Users" do 
    it "should have all params before user is created and must be created by admin" do 
      new_user_params = {
        email: "new_user@example.com",
        password: "password",
        first_name: "example user",
        last_name: "example user",
        clinic_id: clinic.id,
        admin: false
      }
        # admins token being used for auth
      post "/users", params: new_user_params, headers: { "Authorization" => "Bearer #{token}" }
      #  puts "new user created: #{response.body}"

      expect(response).to have_http_status(:created)
      json_response = JSON.parse(response.body)
      # puts "new user created: #{json_response}"
    end

    it "will be invalid if user is not admin" do 
     
      new_user_params = {
        email: "new_user@example.com",
        password: "password",
        first_name: "example user",
        last_name: "example user",
        clinic_id: clinic.id,
        admin: false
      }

      post "/users", params: new_user_params, headers: { "Authorization" => "Bearer #{test_token}" }

      # puts "fails post by non admin: #{test_user.first_name}, response: #{response.body}"
      expect(response).to have_http_status(:unauthorized)
      failed_response = JSON.parse(response.body)
      expect(failed_response["message"]).to include("You must be an admin to perform this action.")
    end
  end

  describe "POST/ medifile" do 
    it "should have these params in order to be created successfully by admin" do
      medifile_test = {
        title: "medifile test", 
        description: "test description", 
        instructions: "test instructions", 
        file_link: fixture_file_upload(Rails.root.join('db/ProHealthPDF/Auth-Orthonet.pdf'), 'application/pdf'), # ✅ Attach file
        file_cover: fixture_file_upload(Rails.root.join('db/ProHealthPDFcover/Orthonet.jpg'), 'image/jpeg'),
        file_cover_alt: "file cover alt", 
        language: "English", 
        file_owner_id: user.id
      }
      post "/create-medifiles-template", params: medifile_test, headers: { "Authorization" => "Bearer #{token}" }

      # puts "medifile: #{response.body}"
      expect(response).to have_http_status(:created)
      response_title = JSON.parse(response.body)
      expect(response_title["title"]).to eq("medifile test")
    end
    
    it "will fail without user_id, file links and covers" do 
      invalid_medifile = {
        title: "medifile test", 
        description: "test description", 
        instructions: "test instructions", 
        file_cover_alt: "file cover alt", 
        language: "English", 
      }
      post "/create-medifiles-template", params: invalid_medifile, headers: { "Authorization" => "Bearer #{token}" }

           puts "invalid medifile: #{response.body}"
      expect(response).to have_http_status(:unprocessable_entity)
      json_response = JSON.parse(response.body)
      expect(json_response['medifile']).to include("File link can't be blank","File cover can't be blank","File owner can't be blank")
    end
  end

  describe "POST /create-patient-template" do
    it "should create a new patient email template through user controller" do 
      patient_params = {
        px_temp_title: "post test", 
        px_temp_subject: "post test", 
        px_temp_content: "post test",
        px_owner_id: user.id,
        category: "post test",
        language: "post test"
       }
      post "/create-patient-template", params: patient_params, headers: { "Authorization" => "Bearer #{token}" }

        expect(response).to have_http_status(201)
        json_response = JSON.parse(response.body)
        current_temp = json_response["response"]
        #  puts "🚀 DEBUG Params: #{current_temp["px_temp_title"]}"
        expect(current_temp["px_temp_title"]).to eq("post test")
    end

    it "is invalid if attributes for owner, title and category not present" do
      invalid_params = {
        px_temp_subject: "post test", 
        px_temp_content: "post test",
        language: "post test"
      }
      post "/create-patient-template", params: invalid_params, headers: { "Authorization" => "Bearer #{token}" } 

      # puts "response status: #{response.body}"

      expect(response).to have_http_status(:unprocessable_entity)

      json_response = JSON.parse(response.body)
      expect(json_response["message"]).to include("Px owner can't be blank", "Px temp title can't be blank", "Category can't be blank")

    end
  end

  describe "POST /create-doctor-template" do
    it "should create a new patient email template through user controller" do 
     dr_params = {
        dr_temp_title: "post test on dr", 
        dr_temp_subject: "post test on dr", 
        dr_temp_content: "post test on dr",
        dr_owner_id: user.id,
        category: "post test on dr"
       }
      post "/create-doctor-template", params: dr_params, headers: { "Authorization" => "Bearer #{token}" }

        expect(response).to have_http_status(201)
        json_response = JSON.parse(response.body)
        current_temp = json_response["response"]
        # puts "current temp response: #{current_temp}"
        expect(current_temp["dr_temp_title"]).to eq("post test on dr")
    end

    it "is invalid if attributes for owner, title and category not present" do
      invalid_params = {
        dr_temp_subject: "invalid post test", 
        dr_temp_content: "invalid post test",
      }
      post "/create-doctor-template", params: invalid_params, headers: { "Authorization" => "Bearer #{token}" } 

      # puts "response status: #{response.body}"

      expect(response).to have_http_status(:unprocessable_entity)

      json_response = JSON.parse(response.body)
      expect(json_response["message"]).to include("Dr owner can't be blank", "Dr temp title can't be blank", "Category can't be blank")

    end


  end

end
