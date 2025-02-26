require 'rails_helper'

RSpec.describe OrderedItem, type: :model do
    # test clinic
    let(:clinic) { Clinic.create!(clinic_location_name: "East", clinic_location_address: "1041 3rd ave") }
    # users admin  
    let(:admin_user) { User.create!(email: "USER@gmail.com", password: "123456", first_name: "JOHN", last_name: "DOE", admin: true, clinic_id: clinic.id) }
      # non admin user
    let(:user) { User.create!(email: "NONADMINUSER@gmail.com", password: "123456", first_name: "cHristIAN", last_name: "CeDeNo", admin: false, clinic_id: clinic.id) }

    before do 
      @clorox = OrderedItem.create!(clinic_id: clinic.id, user_id: admin_user.id, item_type: "cleaning", item_name: "Clorox", order_quantity: 5, order_date: Date.today, order_received: false, delivery_date: Date.new(2025-02-25), item_link: "Clorox.com" )
    end

describe "#UPDATE_INVENTORY model" do 

  it "after save of this ordered item instance; order_received attriibute is is changed to true, function runs find or create inventory instance" do 
    time_created = Date.today
    @clorox.update(order_received: true)
     puts "creating new inventory instance ..."
    puts "finding newly created inventory instance"
    inv_item = InventoryItem.find_by(item_name: @clorox.item_name, clinic_id:clinic.id)
    puts "variable; of time instance created"
    newly_created_at = inv_item['created_at']
        puts "time_function_runs: #{time_created.to_time}"
        puts "created_at: #{newly_created_at}"
  
    if time_created <=  newly_created_at
      expect(inv_item['item_name']).to eq(@clorox.item_name)
      expect(inv_item['count']).to eq(@clorox.order_quantity)
        puts "inv_item_name: #{inv_item['item_name']} == O_I: #{@clorox.item_name} "
        puts "inv_item_count: #{inv_item['count']}  == O_I: #{@clorox.order_quantity}"
    else
      puts "item already exists; item was not created"
  end
  end

end 




end
