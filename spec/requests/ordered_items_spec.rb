require 'rails_helper'

RSpec.describe "OrderedItems", type: :request do

  let!(:east_clinic) { Clinic.create!(clinic_location_name: "East", clinic_location_address: "1041 3rd ave")}

  let!(:west_clinic) { Clinic.create!( clinic_location_name: "West", clinic_location_address: "180 westend ave" )}

  # admin user
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

  # non admin user
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
    # admin created item
    @windex = OrderedItem.create!(clinic_id: east_clinic.id, user_id: user.id,  item_type: "cleaning", item_name: "Windex", item_link: "Windex.com", order_received: false, order_date: Date.today - 3, delivery_date: Date.today + 5, order_quantity: 4)
    # non admin created 
    @clorox = OrderedItem.create!(clinic_id: west_clinic.id, user_id: test_user.id,  item_type: "cleaning", item_name: "Clorox", item_link: "Clorox.com", order_received: true, order_date: Date.today - 5, delivery_date: Date.today, order_quantity: 2)

    # missing count and type
    @invalid_clorox_new = {
      clinic_id: west_clinic.id,
      user_id: test_user.id, 
      item_name: "Clorox", 
      item_link: "Clorox.com", 
      order_received: true, 
      order_date: Date.today - 5, 
      delivery_date: Date.today
    }
      # missing associatiions/ .ids
    @invalid_windex_new = {
      item_type: "cleaning",
      item_name: "Windex", 
      item_link: "Windex.com", 
      order_received: false, 
      order_date: Date.today - 3, 
      delivery_date: Date.today + 5,
      order_quantity: 4
    }
    
  end


  describe "GET / ordered_item.all #index" do

    it "(ADMIN) (INDEX) should return all ordered items with clinic and user association" do 
      get "/ordered_items", headers: { "Authorization" => "Bearer #{token}"}

      json_response = JSON.parse(response.body)
      puts "response: #{json_response}"

      expect(response).to have_http_status(:ok)
      expect(json_response.length).to be > 0

    end

    it "(NON_ADMINN) (INDEX) should return all ordered items with clinic and user association" do
      get "/ordered_items", headers: { "Authorization" => "Bearer #{test_token}"}

       json_response = JSON.parse(response.body)
       puts "response: #{json_response}"

       expect(response).to have_http_status(:ok)
       expect(json_response.length).to be > 0

    end

    it "(ADMIN)(SHOW) should return as single instance with the show method" do 
      get "/ordered_items/#{@windex.id}", headers: { "Authorization" => "Bearer #{token}"}

       json_response = JSON.parse(response.body)
       puts "response: #{json_response}"

      expect(response).to have_http_status(:ok)
      expect(json_response['item_name']).to eq(@windex.item_name)
    end

    it "(NON-ADMIN) (SHOW) should return as single instance with the show method" do 
      get "/ordered_items/#{@clorox.id}", headers: { "Authorization" => "Bearer #{test_token}"}

      json_response = JSON.parse(response.body)
      puts "response: #{json_response}"

     expect(response).to have_http_status(:ok)
     expect(json_response['item_name']).to eq(@clorox.item_name)

    end

  end

  # describe "POST /create" do

  # end

  # descirbe "PATCH /update" do
    
  # end

  # describe "DELETE /destroy" do

  # end

end
