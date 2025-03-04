require 'rails_helper'

RSpec.describe "Tasks", type: :request do

  before do 
      @east_clinic =  Clinic.create!(clinic_location_name: "Eastside", clinic_location_address: "1041 3rd avenue")

      @west_clinic = Clinic.create!( clinic_location_name: "Westside", clinic_location_address: " 180 westend avenue")

      @current_user = User.create!(first_name: "Chris", last_name: "Cedeno", email: "Christiancedeno@prohealthptot.com", password: "123456abc", role: "Admin", clinic_location: "East", admin: true, clinic_id: @east_clinic.id )

      @token = JWT.encode({ user_id: @current_user.id}, 'password', 'HS256')

      @non_admin = User.create!( first_name: "John", last_name: "Thomas", email: "JohnThomas@prohealthptot.com", password: "123456abc", role: "Front Desk", clinic_location: "West", admin: false, clinic_id: @west_clinic.id )

      @non_admin_token = JWT.encode({user_id: @non_admin.id}, 'password', 'HS256')

       @task_example = Task.create!(
         clinic_id: @east_clinic.id, 
         task_table_title: "Patient Retention", 
         column_names: {
           column_one: "Patient",
           column_two: "Scheduled",
           column_three: "Status",
           column_four: "Outreach"
          })

          @task_example_two = Task.create!(
            clinic_id: @west_clinic.id, 
            task_table_title: "Patient Referral", 
            column_names: {
              column_one: "Patient",
              column_two: "Reffered",
              column_three: "Status",
              column_four: "Dr"
             })
  end

  let(:valid_attributes) do {
    clinic_id: @east_clinic.id, 
    task_table_title: "Appointment Reminders",
    column_names: {
      column_one: "Patient",
      column_two: "Scheduled",
      column_three: "Outreach",
      column_four: "Confirmed"
    }
   }
  end 

  let(:invalid_attributes) do {
    # invalid attribute due to empty :column_names & clinic_id 
    task_table_title: "Outreach"
    }
  end

  let(:valid_headers) {
    {"Authorization" => "Bearer #{@token}"}
  }

  let(:non_admin_headers) {
    {"Authorization" => "Bearer #{@non_admin_token}"}
  }

  describe "GET /index" do
    it "renders a successful response" do
      # Task.create! valid_attributes
      get "/tasks", headers: valid_headers, as: :json

      puts " RESPONSE: > #{response.body}"
      expect(response).to be_successful
    end


    it "should render task by clinic association" do 
      get "/all_clinical_task_tables", headers: valid_headers, as: :json

      puts "response: #{response}"
      json_response = JSON.parse(response.body)

      puts "json-response: #{json_response}"
      expect(response).to be_successful
      expect(response).to have_http_status(:ok)
    end
  end

  describe "GET /show" do
    it "renders a successful response" do
      get "/tasks/#{@task_example.id}",headers: valid_headers, as: :json

        puts "response: #{response.body}"
        json_response = JSON.parse(response.body)

      expect(response).to have_http_status(:ok)
      expect(json_response['task_table_title']).to eq(@task_example.task_table_title)
    end
  end

  describe "POST /create" do
      it "creates a new Task" do
        expect {
          post "/tasks",
               params: valid_attributes, headers: valid_headers, as: :json
        }.to change(Task, :count).by(1)
        expect(response).to have_http_status(:created)
        expect(response.content_type).to match(a_string_including("application/json"))
      end

    context "with invalid parameters, or user credentials" do
      it "does not create a new Task because of task params" do
        expect {
          post "/tasks",
               params: invalid_attributes, headers: valid_headers, as: :json
        }.to change(Task, :count).by(0)
        expect(response).to have_http_status(:unprocessable_entity)
        expect(response.content_type).to match(a_string_including("application/json"))
      end

      it "does not create a new Task because of user token params invalid or missing" do
        expect {
          post "/tasks",
               params: invalid_attributes, as: :json
        }.to change(Task, :count).by(0)
        expect(response).to have_http_status(:unauthorized)
        expect(response.content_type).to match(a_string_including("application/json"))
      end

      it "should fail to create since user is not admin, create is admin only method" do
        expect{ 
          post "/tasks", params: valid_attributes, headers: non_admin_headers, as: :json
        }.to change(Task, :count).by(0)

        expect(response).to have_http_status(:unauthorized)
      end

    end
  end



  describe "PATCH /update" do
    context "with valid parameters" do
      let(:new_attributes) {
        { column_names: { column_one: "Patient Name"} }
       }

      it "updates the requested task" do
        patch "/tasks/#{@task_example.id}", params: new_attributes, headers: valid_headers, as: :json

          expect(response).to have_http_status(:ok)
          json_response = JSON.parse(response.body)
          puts "response: #{json_response['task']}"
          expect(response.content_type).to match(a_string_including("application/json"))
          expect(json_response['task']['column_names']['column_one']).to eq("Patient Name")
      end

    end

    context "with invalid parameters" do
      let(:new_invalid_attributes) {
        { clinic_id: "hello" }
       }
      #  clinic_id expects a association 
      it "renders a JSON response with errors the task" do
        patch "/tasks/#{@task_example.id}", params: new_invalid_attributes, headers: valid_headers, as: :json

        json_response = JSON.parse(response.body)

        expect(json_response['message']).to eq("failed to update #{@task_example.task_table_title}")
        expect(response).to have_http_status(:unprocessable_entity)
        expect(response.content_type).to match(a_string_including("application/json"))
      end
    end
  end

  describe "DELETE /destroy" do
    it "destroys the requested task" do
      expect {
        delete "/tasks/#{@task_example.id}", headers: valid_headers, as: :json
      }.to change(Task, :count).by(-1)

      json_response = JSON.parse(response.body)
      expect(json_response['message']).to eq("#{@task_example.task_table_title} has been deleted")
    end
  end
end
