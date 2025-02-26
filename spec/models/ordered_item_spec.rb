require 'rails_helper'

RSpec.describe OrderedItem, type: :model do
    # test clinic
    let(:clinic) { Clinic.create!(clinic_location_name: "East", clinic_location_address: "1041 3rd ave") }
    # users admin  
    let(:admin_user) { User.create!(email: "john@gmail.com", password: "123456", first_name: "john", last_name: "doe", admin: true, clinic_id: clinic.id) }
      # non admin user
    let(:user) { User.create!(email: "chris@gmail.com", password: "123456", first_name: "christian", last_name: "cedeno", admin: false, clinic_id: clinic.id) }

    before do 
      @clorox = OrderedItem.create!(clinic_id: clinic.id, user_id: admin_user.id, item_type: "cleaning", item_name: "Clorox", order_quantity: 5, order_date: Date.today - 10, order_received: false, delivery_date: Date.today, item_link: "Clorox.com" )

      @windex = OrderedItem.create!(clinic_id: clinic.id, user_id: admin_user.id, item_type: "cleaning", item_name: "Windex", order_quantity: 3, order_date: Date.today - 10, order_received: false, delivery_date: Date.today, item_link: "Windex.com")
      # exisiting item "windex" 
      @exisiting_windex = InventoryItem.create!(clinic_id: clinic.id, user_id: admin_user.id, item_type: "cleaning", item_name: "Windex", item_link: "Windex.com", item_requested: true, staple_item: true, count: 1, warning_count: 2, item_status: "insufficient")
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

  it "should find and update exisiting item with new count and ordered quantity" do
          before_save = Date.today
        puts "finding if item exists: #{@exisiting_windex} exisiting_item_count: #{@exisiting_windex.count}. with ordered_item @windex attributes"
        existing_item = InventoryItem.find_by(clinic_id: @windex.clinic_id, item_name: @windex.item_name)
        puts "Found existing item: #{existing_item}"
          puts "existing item_count: #{existing_item.count}"
      if existing_item
        # update windex to trigger model method
        @windex.update(order_received: true)
      else
        puts "item does not exist in inv_item table"
      end
    expect(@exisiting_windex.reload.count).to eq(existing_item.count + @windex.order_quantity)
    expect(@exisiting_windex.reload.updated_at).to be > before_save
      puts "refreshed inventory item count: #{@exisiting_windex.reload.count}"
      puts "updated at : #{@exisiting_windex.reload.updated_at}"
      puts "function started at: #{before_save}"
      
  end




end 




end
