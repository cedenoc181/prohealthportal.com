require 'rails_helper'

RSpec.describe "InventoryItems", type: :request do

  let!(:clinic) { Clinic.create!(clinic_location_name: "East", clinic_location_address: "1041 3rd ave")}

  let!(:west_clinic) { Clinic.create!( clinic_location_name: "West", clinic_location_address: "180 westend ave" )}

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
      first_name: "jimmy",
      last_name: "torres",
      clinic_id: clinic.id,
      admin: false
    )
  }

  let!(:clorox) { 
    InventoryItem.create!(
      user_id: user.id,
      clinic_id: clinic.id,
      item_type: "cleaning supply",
      item_name: "Clorox",
      count: 6, 
      staple_item: true,
      item_link: "clorox.com",
      warning_count: 3
    )
  }
   # non admin token
  let(:test_token) { JWT.encode({user_id: test_user.id},'password', 'HS256')}
    # admin's token
  let(:token) { JWT.encode({ user_id: user.id }, 'password', 'HS256')}


  describe "GET/ index of inventory" do

    it "should get all instances of InventoryItem" do 
      get "/users", headers: { "Authorization" => "Bearer #{token}" }
      
      expect(response).to have_http_status(:ok)
      json_response = JSON.parse(response.body)
      expect(json_response).to be_present
    end

    it "should index all inventory items by status" do 
      get '/inventory_item_status', headers: { "Authorization" => "Bearer #{token}"}

        expect(response).to have_http_status(:ok)  
        json_response = JSON.parse(response.body)
        expect(json_response).to be_present
    end


    it "should index inventory by item type" do 
      get "/inventory_type", headers: { "Authorization" => "Bearer #{token}"}

        expect(response).to have_http_status(:ok)
        json_response = JSON.parse(response.body)
        expect(json_response).to be_present
    end
    
    it "should index inventory by clinics" do 
      get "/inventory_by_clinic", headers: { "Authorization" => "Bearer #{token}"}

      expect(response).to have_http_status(:ok)
    end

    it "shopuld index by item request sent" do 
      get "/inventory_by_requested", headers: { "Authorization" => "Bearer #{token}"}

      expect(response).to have_http_status(:ok)
    end
  end

    describe "POST/  method for inventory items #create" do
      it "should return new inventory item if params are met, via Admin" do 
        valid_params = { user_id: user.id, clinic_id: clinic.id, item_type: "office supply", item_name: "Toilet paper", count: 6, staple_item: true, item_link: "toilet-paper.com", warning_count: 3 }
         post "/inventory_items", params: valid_params, headers: { "Authorization" => "Bearer #{token}"}

          expect(response).to have_http_status(:created)
          json_response = JSON.parse(response.body)
          expect(json_response).to be_present
      end

      it "should fail if user is not admin" do 
        valid_params = { user_id: user.id, clinic_id: clinic.id, item_type: "office supply", item_name: "Toilet paper", count: 6, staple_item: true, item_link: "toilet-paper.com", warning_count: 3 }
          # non admin token being used for test
          post "/inventory_items", params: valid_params, headers: { "Authorization" => "Bearer #{test_token}"}

          expect(response).to have_http_status(:unauthorized)
      end

      it "should fail if params are not all met even if user admin: user_id, clinic_id, item_name, item_type, count, warning_count" do 
        invalid_params = { item_type: "cleaning supply", item_name: "windex", item_link: "windex.com", staple_item: true, count: 5}
          post "/inventory_items", params: invalid_params, headers: { "Authorization" => "Bearer #{token}"}

          expect(response).to have_http_status(:unprocessable_entity)
          json_response = JSON.parse(response.body)
          expect(json_response['message']).to eq("inventory item was unable to be created, please check params are met and user is admin.")
      end 

      # TEST FOR /inventory_by_staff post method for non admins
      it "should allow post for non admins through this custom route" do 
        non_admin_inventory_item = { user_id: test_user.id, clinic_id: clinic.id, item_type: "office supply", item_name: "Toilet paper", count: 6, staple_item: true, item_link: "toilet-paper.com", warning_count: 3 }
          post "/inventory_by_staff", params: non_admin_inventory_item, headers: { "Authorization" => "Bearer #{test_token}"}

          expect(response).to have_http_status(:created)
          json_response = JSON.parse(response.body)
          expect(json_response['message']).to eq("jimmy successfully added new inventory item.")
      end

      it "should fail if admin uses route" do 
        admin_inventory_item = { user_id: user.id, clinic_id: clinic.id, item_type: "office supply", item_name: "Toilet paper", count: 6, staple_item: true, item_link: "toilet-paper.com", warning_count: 3 }
          post "/inventory_by_staff", params: admin_inventory_item, headers: { "Authorization" => "Bearer #{token}"}

          expect(response).to have_http_status(:unauthorized)
          json_response = JSON.parse(response.body)
          expect(json_response['message']).to eq("Only for non admins to use POST crud.")
      end

      it "should fail if any mandatory params are missing(using authorized, non admin)" do 
        mandatory_params = ["user_id", "clinic_id", "item_name", "item_type", "count", "warning_count"]
        # object below wiill be missing "user_id", "clinic_id" attributes for test 
        non_admin_inventory_item = { item_type: "office supply", item_name: "Toilet paper", count: 6, staple_item: true, item_link: "toilet-paper.com", warning_count: 3 }
          post "/inventory_by_staff", params: non_admin_inventory_item, headers: { "Authorization" => "Bearer #{test_token}"}

          expect(response).to have_http_status(:unprocessable_entity)
          json_response = JSON.parse(response.body)
          expect(json_response['message']).to eq("invalid params, user clinic_id must match inventory item clinic_id attribtue.")
      end

      it "should only allow user(non admin) to create inventory for thier associated clinic" do
        #  user is not associated with west clinic, test should fail
        non_admin_inventory_item = { user_id: test_user.id, clinic_id: west_clinic.id, item_type: "office supply", item_name: "Toilet paper", count: 6, staple_item: true, item_link: "toilet-paper.com", warning_count: 3 }
         post "/inventory_by_staff", params: non_admin_inventory_item, headers: { "Authorization" => "Bearer #{test_token}"}

          expect(response).to have_http_status(:unprocessable_entity)
          json_response = JSON.parse(response.body)
          expect(json_response['message']).to eq("invalid params, user clinic_id must match inventory item clinic_id attribtue.")
      end
    end

    describe "UPDATE/ inventory item patch method" do 
      it "should update if user is admin" do
        # updating count from 6 to 5 for clorox instance
        update_clorox_params = { count: 5}
         patch "/inventory_items/#{clorox.id}", params: update_clorox_params, headers: { "Authorization" => "Bearer #{token}"}

          expect(response).to have_http_status(:ok)
          json_response = JSON.parse(response.body)
          json_response_item = json_response["item"]
          expect(json_response_item["count"]).to eq(5)
      end

      it "should fail if inventory item does not have the same clinic_id and user_id as user, both must be met" do 
        update_clorox_params = { count: 5}
        # clorox is inventory for East clinic(:clinic) and created by (:user) admin
          patch "/inventory_items/#{clorox.id}", params: update_clorox_params, headers: { "Authorization" => "Bearer #{test_token}"}

          expect(response).to have_http_status(:unprocessable_entity)
          json_response = JSON.parse(response.body)
          expect(json_response["message"]).to eq("failed to update Clorox, make sure user_id and clinic_id match item.")
      end

      it "should update if non admin makes patch request and meets the user_id and clinic_id validation" do 
        windex = InventoryItem.create!( user_id: test_user.id, clinic_id: clinic.id, item_type: "cleaning supply", item_name: "windex", count: 6,  staple_item: true, item_link: "windex.com", warning_count: 3)
          windex_update_params = {count: 3}
            patch "/inventory_items/#{windex.id}", params: windex_update_params, headers: { "Authorization" => "Bearer #{test_token}"}

            expect(response).to have_http_status(:ok)
            json_response = JSON.parse(response.body)
            expect(json_response["message"]).to eq("windex has been successfully updated")
      end
    end


    describe "DESTROY/  method for inventory items" do 

      it "Should destroy instance if user is admin" do 
        delete "/inventory_items/#{clorox.id}", headers: { "Authorization" => "Bearer #{token}"}

        expect(response).to have_http_status(:ok)
        json_response = JSON.parse(response.body)
        expect(json_response['message']).to eq("#{clorox.item_name} was successfully deleted")
      end

      it "should destroy instance if user is owner and belong to the same clinic as the item instance" do
        windex = InventoryItem.create!( user_id: test_user.id, clinic_id: clinic.id, item_type: "cleaning supply", item_name: "windex", count: 6,  staple_item: true, item_link: "windex.com", warning_count: 3)
          delete "/inventory_items/#{windex.id}", headers: { "Authorization" => "Bearer #{test_token}"}

           expect(response).to have_http_status(:ok)
           json_response = JSON.parse(response.body)
           expect(json_response['message']).to eq("#{windex.item_name} was successfully deleted")
      end

      it "should fail if user_id and clinic_id does not match the inventory instance" do 
        delete "/inventory_items/#{clorox.id}", headers: { "Authorization" => "Bearer #{test_token}"}

         expect(response).to have_http_status(:unauthorized)
         json_response = JSON.parse(response.body)
         expect(json_response['message']).to eq("failed to delete #{clorox.item_name}")
      end


    end


end
