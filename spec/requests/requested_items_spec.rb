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

        requested_item = json_response['item']

        expect(requested_item['item_name']).to eq(@clorox.item_name)
    end

      it "should return not found if item does not exists" do 
        get "/requested_items/3", headers: { "Authorization" => "Bearer #{token}"}

        expect(response).to have_http_status(:not_found)

        json_response = JSON.parse(response.body)

        expect(json_response['error']).to eq("Record not found")
      end



  end

  describe "POST/ RequestedItems.create #Create" do 
    # headers: { "Authorization" => "Bearer #{token}"}
      # headers: { "Authorization" => "Bearer #{test_token}"}

  end

  describe "PATCH/ RequestedItems.update #Update" do 
    # headers: { "Authorization" => "Bearer #{token}"}
      # headers: { "Authorization" => "Bearer #{test_token}"}

  end

  describe "DELETE/ RequestedItems.destroy #Delete" do
    # headers: { "Authorization" => "Bearer #{token}"}
    # headers: { "Authorization" => "Bearer #{test_token}"}

  end


end
