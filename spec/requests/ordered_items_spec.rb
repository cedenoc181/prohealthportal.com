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

    @valid_params = {
      clinic_id: west_clinic.id,
      user_id: test_user.id, 
      item_type: "office",
      item_name: "pens", 
      item_link: "amazon.com", 
      order_received: false, 
      order_date: Date.today, 
      delivery_date: Date.today + 7, 
      order_quantity: 100
  }

  @valid_admin_params = {
    clinic_id: west_clinic.id,
    user_id: user.id, 
    item_type: "office",
    item_name: "paper", 
    item_link: "amazon.com", 
    order_received: false, 
    order_date: Date.today, 
    delivery_date: Date.today + 7, 
    order_quantity: 100
}

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

    it "(NON_ADMIN) (INDEX) should return all ordered items with clinic and user association" do
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

    it "should fail if ordered_item instance does not exist" do 
      get "/ordered_items/10", headers: {"Authorization" => "Bearer #{token}"}

      json_response = JSON.parse(response.body)
      expect(response).to have_http_status(:not_found)
      expect(json_response['error']).to eq("Record not found")
    end
  end

  describe "POST /create" do
    # non admin create test case
    it "(NON-ADMIN)should create a new record clinic user belongs to" do 
      post "/ordered_items", params: @valid_params, headers: {"Authorization" => "Bearer #{test_token}"}

      json_response = JSON.parse(response.body)

      puts "params: #{json_response}"

      expect(response).to have_http_status(:created)

      expect(json_response['ordered_item']['item_name']).to eq("#{@valid_params[:item_name]}")
    end


    it "(ADMIN) should create new instance as admin for any clinic" do 
      post "/ordered_items", params: @valid_admin_params, headers: {"Authorization" => "Bearer #{token}"}

      json_response = JSON.parse(response.body)

      puts "params: #{json_response}"

      expect(response).to have_http_status(:created)

      expect(json_response['ordered_item']['item_name']).to eq("#{@valid_admin_params[:item_name]}")
   
    end

    it "should fail if params are not valid" do 
      post "/ordered_items", params: @invalid_clorox_new, headers: { "Authorization" => "Bearer #{test_token}"}

        json_response = JSON.parse(response.body)
          puts "JSON response: #{json_response}"

        expect(response).to have_http_status(:unprocessable_entity)
        expect(json_response['ordered_item']).to eq(["Item type can't be blank", "Order quantity can't be blank"])
    end
  end

  describe "PATCH /update" do

    before do
      @valid_update_params = {
        order_quantity: 4, 
        item_name: "Clorox vegan"
      }
    end

    it "should update if admin updates any instance" do
      patch "/ordered_items/#{@clorox.id}", params: @valid_update_params, headers: { "Authorization" => "Bearer #{token}"}

        expect(response).to have_http_status(:ok)

        json_response = JSON.parse(response.body)

        expect(json_response["ordered_item"]["item_name"]).to eq(@valid_update_params[:item_name])
    end

    it "should update if non admin is creating associated instance to clinic it belongs too" do 
      patch "/ordered_items/#{@clorox.id}", params: @valid_update_params, headers: { "Authorization" => "Bearer #{test_token}"}

      expect(response).to have_http_status(:ok)

      json_response = JSON.parse(response.body)

      expect(json_response["ordered_item"]["item_name"]).to eq(@valid_update_params[:item_name])
    end

    it "should fail if non admin tries to update another clinics ordered item" do 
      patch "/ordered_items/#{@windex.id}", params: @valid_update_params, headers: { "Authorization" => "Bearer #{test_token}"}
      
      expect(response).to have_http_status(:unauthorized)

      json_response = JSON.parse(response.body)

        puts "response: #{json_response}"
      expect(json_response['message']).to eq("failed to update ordered item")
    
    end

  end


  describe "DELETE /destroy" do

  it "should destroy if admin deletes any instance" do
    delete "/ordered_items/#{@clorox.id}", headers: {"Authorization" => "Bearer #{token}"}

    expect(response).to have_http_status(:ok)
  end

  it "should destroy if non admin is deletes associated instance to clinic it belongs too" do 
      delete "/ordered_items/#{@clorox.id}", headers: { "Authorization" => "Bearer #{test_token}"}

      expect(response).to have_http_status(:ok)
  end

  it "should fail if non admin tries to delete another clinics ordered item" do 
    delete "/ordered_items/#{@windex.id}", headers: { "Authorization" => "Bearer #{test_token}"}

    expect(response).to have_http_status(:unauthorized)
  end

  end

end
