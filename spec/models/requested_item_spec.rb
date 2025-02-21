require 'rails_helper'

RSpec.describe RequestedItem, type: :model do

    # test clinic
    let(:clinic) { Clinic.create!(clinic_location_name: "East", clinic_location_address: "1041 3rd ave") }
    # users admin  
    let(:admin_user) { User.create!(email: "USER@gmail.com", password: "123456", first_name: "JOHN", last_name: "DOE", admin: true, clinic_id: clinic.id) }
      # non admin user
    let(:user) { User.create!(email: "NONADMINUSER@gmail.com", password: "123456", first_name: "cHristIAN", last_name: "CeDeNo", admin: false, clinic_id: clinic.id) }

     let(:paper) { RequestedItem.create!(
      user_id: admin_user.id,
      clinic_id: clinic.id,
      item_type: "office supply",
      item_name: "Printing Paper stack",
      requested_quantity: 3, 
      item_link: "paper.com",
      request_fulfilled: false
    )}

      # pre created order instance 
      let(:ordered_paper) { OrderedItem.create!(
        user_id: admin_user.id,
        clinic_id: clinic.id,
        item_type: "office supply",
        item_name: "Printing Paper stack",
        order_quantity: 3, 
        item_link: "paper.com",
        order_date: Date.new(2013, 1, 1),
        order_received: true,
        delivery_date: Date.new(2013, 1, 11)
      )}


  describe "#ORDERED_FULFILLED/ method requested_items model" do 
    it "Should find or create new OrderedItem instance when method is executed" do 

        paper.update(request_fulfilled: true)
        # find newly created instance
        paper_order = OrderedItem.find_by({ clinic_id: paper.clinic_id, item_name: paper.item_name, user_id: paper.user_id })
        puts {paper_order}

        expect(paper_order).to be_present
        expect(paper_order.order_date).to eq(Date.today)
        expect(paper_order.user_id).to eq(paper.user_id)
        expect(paper_order.clinic_id).to eq(paper.clinic_id)
        expect(paper_order.order_quantity).to eq(paper.requested_quantity)
    end

    it "should return exisiting item with updated attributes" do 
      # instance exists already
      expect(ordered_paper).to be_present
      expect(ordered_paper.order_received).to be_truthy

      # updating requested_items instance
        paper.update(request_fulfilled: true)

        # finding if requested_items instance already exist in the ordered_item table to reuse instance with updated attributes instead of creating new instance
        # reduces over crowded database 
          exists = OrderedItem.find_by({ clinic_id: paper.clinic_id, item_name: paper.item_name })
        expect(exists).to eq(ordered_paper)
        expect(exists.order_received).to be_falsey
        # pre created instance updated by method siince it exists prior to the paper.update
        expect(ordered_paper.reload.order_received).to be_falsey
      
    end
  end




end
