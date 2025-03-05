require 'rails_helper'


RSpec.describe "/task_contents", type: :request do

  before do 
    @east_clinic =  Clinic.create!(clinic_location_name: "Eastside", clinic_location_address: "1041 3rd avenue")

    @west_clinic = Clinic.create!( clinic_location_name: "Westside", clinic_location_address: " 180 westend avenue")

    @current_user = User.create!(first_name: "Chris", last_name: "Cedeno", email: "Christiancedeno@prohealthptot.com", password: "123456abc", role: "Admin", clinic_location: "East", admin: true, clinic_id: @east_clinic.id )

    @non_admin = User.create!( first_name: "John", last_name: "Thomas", email: "JohnThomas@prohealthptot.com", password: "123456abc", role: "Front Desk", clinic_location: "West", admin: false, clinic_id: @west_clinic.id )

    @token = JWT.encode({ user_id: @current_user.id}, 'password', 'HS256')

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

           @task_contents_example = TaskContent.create!(
            task_id: @task_example.id, 
            user_id: @current_user.id, 
            task_data: {
              column_one: "Rafael Devers",
              column_two: Date.new(2025, 10, 30),
              column_three: "comfirmed",
              column_four: Date.new(2025, 10, 29)
             })
     
             @task_contents_example_two = TaskContent.create!(
              task_id: @task_example_two.id, 
              user_id: @non_admin.id,
               task_data: {
                 column_one: "Juan Soto",
                 column_two: Date.new(2025, 3, 22),
                 column_three: "un-comfirmed",
                 column_four: Date.new(2025, 3, 4)
                })
  end


  let(:valid_attributes) do {
    task_id: @task_example.id,
    user_id: @current_user.id,
    task_data: {
      column_one: "David Ortiz",
      column_two: Date.new(2018, 10, 28),
      column_three: "comfirmed",
      column_four: Date.new(2018, 10, 27)
     }
    }
  end

  let(:invalid_attributes) do {
    task_id: @task_example.id,
    user_id: @current_user.id,
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
      get "/task_contents", headers: valid_headers, as: :json

      expect(response).to be_successful
      expect(response).to have_http_status(:ok)
    end

    it "should render first 5 instances" do 
      get "/first_five_clinical_task", headers: valid_headers, as: :json

      expect(response).to have_http_status(:ok)
    end
  end

  describe "GET /show" do
    it "renders a successful response" do
      get "/task_contents/#{@task_contents_example.id}", headers: valid_headers, as: :json

      expect(response).to be_successful
      expect(response).to have_http_status(:ok)
    end

    context " Should fail for unauthorized access" do 
      it "will fail if headers are not set" do 
        get "/task_contents/#{@task_contents_example.id}", as: :json
        
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end

  describe "POST /create" do
    context "with valid parameters" do
      it "creates a new TaskContent" do
        expect {
          post "/task_contents",
               params: valid_attributes, headers: valid_headers, as: :json

        }.to change(TaskContent, :count).by(1)

          json_response = JSON.parse(response.body)
          puts "response: #{json_response}"
          puts "clinic_id from task content assocaition to task: #{json_response['task']['clinic_id']}"

        expect(response).to have_http_status(:created)
        expect(json_response['task']['clinic_id']).to eq(@east_clinic.id)
        expect(response.content_type).to match(a_string_including("application/json"))
      end

    end

    context "with invalid parameters" do
      it "does not create a new TaskContent" do
        expect {  post "/task_contents", params: invalid_attributes, headers: valid_headers,  as: :json
        }.to change(TaskContent, :count).by(0)

        expect(response).to have_http_status(:unprocessable_entity)
        expect(response.content_type).to match(a_string_including("application/json"))
      end

    end
  end

  describe "PATCH /update" do
    context "with valid parameters" do
      let(:new_attributes) { 
        {task_data: { column_one: "Juan the great Soto"}}
      }

      it "updates the requested task_content" do
        patch "/task_contents/#{@task_contents_example_two.id}",
              params: new_attributes, headers: valid_headers, as: :json

              json_response = JSON.parse(response.body)
              puts "response: #{json_response}"

              expect(response).to have_http_status(:ok)
              expect(json_response['task']['task_data']['column_one']).to eq("Juan the great Soto")
              expect(response.content_type).to match(a_string_including("application/json"))
      end

    end

    context "with invalid parameters" do
      let(:new_invalid_attributes) {
        { user_id: "chris" }
      }
      it "renders a JSON response with errors for the task_content" do
        patch "/task_contents/#{@task_contents_example.id}",
              params: new_invalid_attributes, headers: valid_headers, as: :json
              
        expect(response).to have_http_status(:unprocessable_entity)
        expect(response.content_type).to match(a_string_including("application/json"))
      end
    end
  end

  describe "DELETE /destroy" do
    it "destroys the requested task_content" do
      expect {
        delete "/task_contents/#{@task_contents_example.id}", headers: valid_headers, as: :json
      }.to change(TaskContent, :count).by(-1)

      expect(response).to have_http_status(:ok)
    end
  end
end
