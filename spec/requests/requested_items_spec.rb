require 'rails_helper'

RSpec.describe "RequestedItems", type: :request do

    let!(:east_clinic) { Clinic.create!(clinic_location_name: "East", clinic_location_address: "1041 3rd ave")}

    let!(:west_clinic) { Clinic.create!( clinic_location_name: "West", clinic_location_address: "180 westend ave" )}

    let!(:user) {
      User.create!(
        email: "user@example.com",
        password: "password",
        first_name: "christian",
        last_name: "cedeno",
        clinic_id: east_clinic.id,
        admin: true
      )
    }

    let!(:test_user) {
      User.create!(
        email: "test_user@example.com",
        password: "password",
        first_name: "jimmy",
        last_name: "torres",
        clinic_id: west_clinic.id,
        admin: false
      )
    }

     # non admin token
     let(:test_token) { JWT.encode({user_id: test_user.id},'password', 'HS256')}

     # admin's token
     let(:token) { JWT.encode({ user_id: user.id }, 'password', 'HS256')}


    before do
      @clorox = RequestedItem.create!(item_name: "clorox", item_type: "Cleaning", item_link: "clorox.com",
                            requested_quantity: 4, request_fulfilled: false, user_id: test_user.id, clinic_id: west_clinic.id)
      @windex = RequestedItem.create!(item_name: "windex", item_type: "Cleaning", item_link: "windex.com",
                            requested_quantity: 4, request_fulfilled: true, user_id: user.id, clinic_id: east_clinic.id)

      # passing admin test
       @create_params_test_case = { 
         item_name: "Pens", 
         item_type: "Clinic",
         item_link: "pens.com",
         requested_quantity: 10,
         request_fulfilled: false, 
         user_id: user.id, 
         clinic_id: west_clinic.id
       }

      #  failing non admin test
       @create_params_test_case_non_admin = { 
        item_name: "Pens", 
        item_type: "Clinic",
        item_link: "pens.com",
        requested_quantity: 10,
        request_fulfilled: false, 
        user_id: test_user.id, 
        clinic_id: east_clinic.id
      }
      # passing non admin test
      @create_params_test_case_non_admin_2 = { 
        item_name: "Pens", 
        item_type: "Clinic",
        item_link: "pens.com",
        requested_quantity: 10,
        request_fulfilled: false, 
        user_id: test_user.id, 
        clinic_id: west_clinic.id
      }

      @invalid_params = {
        item_name: "Pens", 
        item_type: "Clinic",
        item_link: "pens.com",
        request_fulfilled: false
      }
     end

  

  describe "GET/ RequestedItems.all #Index " do

    it "Should return all items requested" do 
      get "/requested_items", headers: { "Authorization" => "Bearer #{token}"}

      expect(response).to have_http_status(:ok)

      json_response = JSON.parse(response.body)

      puts "response counter: #{json_response.count}"

      expect(json_response).not_to be_nil
      expect(json_response.count).to be > 0
    end

    it "should return items that are found by id(show)" do
      get "/requested_items/#{@clorox.id}", headers: { "Authorization" => "Bearer #{token}"}

        expect(response).to have_http_status(:ok)

        json_response = JSON.parse(response.body)

        # requested_item = json_response['item']
        puts "Requested item: #{json_response['requested_item']['item_name']}"
        expect(json_response['requested_item']['item_name']).to eq(@clorox.item_name)
    end

      it "should return not found if item does not exists" do 
        get "/requested_items/3", headers: { "Authorization" => "Bearer #{token}"}

        expect(response).to have_http_status(:not_found)

        json_response = JSON.parse(response.body)

        expect(json_response['error']).to eq("Record not found")
      end

      it "should return items orderd by clinic_id #requested_items_for_clinics" do 
        get "/requested_items_for_clinics", headers: { "Authorization" => "Bearer #{token}"}

        expect(response).to have_http_status(:ok)
        json_response = JSON.parse(response.body)

        puts "response: #{json_response.count}"
      end

  end

  describe "POST/ RequestedItems.create #Create" do 
    # headers: { "Authorization" => "Bearer #{token}"}
      # headers: { "Authorization" => "Bearer #{test_token}"}
      it "Should create requested_items instance for any clinic if user is admin" do 
        post "/requested_items", params: @create_params_test_case, headers: { "Authorization" => "Bearer #{token}"}

        expect(response).to have_http_status(:created)

        response_json = JSON.parse(response.body)
          puts "response: #{response_json}"
        expect(response_json).not_to be_nil
      end

      it "should fail if a non admin makes a request to a clinic they are not a staff at" do 
        post '/requested_items', params: @create_params_test_case_non_admin, headers: { "Authorization" => "Bearer #{test_token}"}

        expect(response).to have_http_status(:unprocessable_entity)
           response_json = JSON.parse(response.body)
          puts "response: #{response_json}"
          expect(response_json['message']).to eq("failed to create request item make sure you are a staff at the clinic item is for.")
      end

      it "should pass if a non admin makes a request to a clinic they are a staff at" do 
        post '/requested_items', params: @create_params_test_case_non_admin_2, headers: { "Authorization" => "Bearer #{test_token}"}

          expect(response).to have_http_status(:created)
           response_json = JSON.parse(response.body)
          puts "response: #{response_json}"
          requested_item_name = response_json['requested_item']
          expect(response_json['message']).to eq("requested item: #{requested_item_name['item_name']} has been created")
      end

      it "should fail if params are not met for the following attributes" do 
        # params are invalid if the following attributes are missing 
        # clinic_id, user_id, requested_quantity, item_name, item_type
        post "/requested_items", params: @invalid_params, headers: { "Authorization" => "Bearer #{token}"}

        expect(response).to have_http_status(:unprocessable_entity)
        json_response = JSON.parse(response.body)

        expect(json_response['message']).to eq( "failed to create request item, check params.")
      end
  end

  describe "PATCH/ RequestedItems.update #Update" do 
    # headers: { "Authorization" => "Bearer #{token}"}
      # headers: { "Authorization" => "Bearer #{test_token}"}
    it "should update any instance as long as user is admin" do 
      update_params = {
        item_link: "amazon.com",
        requested_quantity: 6
      }
      patch "/requested_items/#{@clorox.id}", params: update_params, headers: { "Authorization" => "Bearer #{token}"}

      expect(response).to have_http_status(:ok)
      json_response = JSON.parse(response.body)
      expect(json_response['message']).to eq("requested item: #{json_response['requested_item']['item_name']} has been updated")
    end

    it "should update; if user updates a item thats associated with their clinic" do 
      update_params = {
        item_link: "amazon.com",
        requested_quantity: 6
      }
      patch "/requested_items/#{@clorox.id}", params: update_params, headers: { "Authorization" => "Bearer #{test_token}"}

      expect(response).to have_http_status(:ok)

      json_response = JSON.parse(response.body)
      expect(json_response['message']).to eq("requested item: #{json_response['requested_item']['item_name']} has been updated")

    end

    it "should fail to update instance if non admin tries to update another clinics requested item" do 
      update_params = {
        item_link: "amazon.com",
        requested_quantity: 6
      }
      patch "/requested_items/#{@windex.id}", params: update_params, headers: { "Authorization" => "Bearer #{test_token}"}

      expect(response).to have_http_status(:unauthorized)

      json_response = JSON.parse(response.body)

      expect(json_response['message']).to eq("failed to update request item make sure you are a staff at the clinic item is for.")
    end
  end

  describe "DELETE/ RequestedItems.destroy #Delete" do
    # headers: { "Authorization" => "Bearer #{token}"}
    # headers: { "Authorization" => "Bearer #{test_token}"}

    it "should delete requested_item if user is admin" do 
      delete "/requested_items/#{@clorox.id}", headers: { "Authorization" => "Bearer #{token}"}

      expect(response).to have_http_status(:ok)
      json_response = JSON.parse(response.body)

      expect(json_response['message']).to eq("#{@clorox.item_name} has been deleted")
    end

    it "should only be able to delete if user belongs to the clinic of requested item " do 
      delete "/requested_items/#{@clorox.id}", headers: { "Authorization" => "Beaer #{test_token}"}

      expect(response).to have_http_status(:ok)
      json_response = JSON.parse(response.body)
      expect(json_response['message']).to eq("#{@clorox.item_name} has been deleted")
    end

    it "should not allow user to delete if they are not associated with the clinic of instance" do 
      delete "/requested_items/#{@windex.id}", headers: { "Authorization" => "Beaer #{test_token}"}   


      expect(response).to have_http_status(:unauthorized)
      json_response = JSON.parse(response.body)
      expect(json_response).to be_present
    end
  end


end
