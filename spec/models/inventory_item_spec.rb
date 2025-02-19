require 'rails_helper'

RSpec.describe InventoryItem, type: :model do
      # test clinic
    let(:clinic) { Clinic.create!(clinic_location_name: "East", clinic_location_address: "1041 3rd ave") }
      # users admin  
    let(:admin_user) { User.create!(email: "USER@gmail.com", password: "123456", first_name: "JOHN", last_name: "DOE", admin: true, clinic_id: clinic.id) }
      # non admin user
    let(:user) { User.create!(email: "NONADMINUSER@gmail.com", password: "123456", first_name: "cHristIAN", last_name: "CeDeNo", admin: false, clinic_id: clinic.id) }
      # inventory item sufficient
    let(:clorox) { 
      InventoryItem.create!(
        user_id: admin_user.id,
        clinic_id: clinic.id,
        item_type: "cleaning supply",
        item_name: "Clorox",
        count: 6, 
        staple_item: true,
        item_link: "clorox.com",
        warning_count: 3
      )
    }

     let!(:toilet_paper) { InventoryItem.create!(
      user_id: admin_user.id,
      clinic_id: clinic.id,
      item_type: "office supply",
      item_name: "Toilet paper",
      count: 3, 
      staple_item: true,
      item_link: "toilet-paper.com",
      warning_count: 6
    )
  }

  describe "Inventory #item_status_update" do 

    it "update item status and item requested if count < warning count" do 
      clorox.update(count: clorox.count - 4)

      expect(clorox.reload.item_requested).to eq(true)
      expect(clorox.reload.item_status).to eq("insufficient")
    end

    it "should not be requested if count <= warning count" do 
      # count: 6
      # warning_count: 3 
      clorox.update(count: clorox.count - 3)

      expect(clorox.reload.item_requested).to eq(false)
      expect(clorox.reload.item_status).to eq("sufficient")
    end

    it "should automatically be updated if created with insufficient count" do 
        paper = InventoryItem.new(
          user_id: admin_user.id,
          clinic_id: clinic.id,
          item_type: "office supply",
          item_name: "Printing Paper stack",
          count: 3, 
          staple_item: true,
          item_link: "paper.com",
          warning_count: 6
        )
        paper.save

        expect(paper.reload.item_status).to eq("insufficient")
        expect(paper.reload.item_requested).to eq(true)
    end

    it "should be sufficient if count > warning_count" do 
      paper = InventoryItem.new(
        user_id: admin_user.id,
        clinic_id: clinic.id,
        item_type: "office supply",
        item_name: "Printing Paper stack",
        count: 6, 
        staple_item: true,
        item_link: "paper.com",
        warning_count: 3
      )
      paper.save

      expect(paper.reload.item_requested).to eq(false)
      expect(paper.reload.item_status).to eq("sufficient")
  end

  end


    describe "Inventory #request_insufficient_item" do
      it "returns requested items instance created by method"  do 
        # update that triggers condition
        clorox.update(count: clorox.count - 4)
          # should be added to requested items table 
        clorox_requested = RequestedItem.find_by(item_name: "Clorox")

          expect(clorox_requested).to be_present
          expect(clorox_requested.reload.item_name).to eq(clorox.item_name)
       end
       
    end




end
