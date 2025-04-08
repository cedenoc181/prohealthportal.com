class InventoryItem < ApplicationRecord
    belongs_to :clinic, inverse_of: :inventory_items  
    belongs_to :user 

    has_many :requested_items, through: :clinic

    before_save :item_status_update

    after_save :request_insufficient_item

    # after_commit :request_insufficient_item 

    validates :user_id, :clinic_id, presence: true

    validates :item_name, :item_type, presence: true
    
    validates :count, :warning_count, presence: true

    private


    # before a new inventory instance is saved, this method runs to add these attributes 
    def item_status_update 
            self.item_requested = count < warning_count
            self.item_status = count < warning_count ? "insufficient" : "sufficient"
    end


# method runs for items that are needed daily for staple items only
# and if item requested was recently changed from false to true.
# doesnt work on newly created items with insufficient count

    def request_insufficient_item
        return unless self.staple_item  && self.saved_change_to_item_requested?(from: false, to: true) 
        return unless self.clinic_id.present?
      
        existing_request = self.clinic.requested_items.find_by(item_name: self.item_name, clinic_id: self.clinic_id)
      
        delete_expired_ordered_item = self.clinic.ordered_items.find_by(item_name: self.item_name, clinic_id: self.clinic_id, order_received: true);

        if existing_request
          # If the request exists, update `ordered` to false to indicate it needs attention
          existing_request.update(
            request_fulfilled: false, 
            user_id: self.user_id
          )
        else
          # Otherwise, create a new request
          self.clinic.requested_items.create!(
            clinic_id: self.clinic_id, 
            item_name: self.item_name, 
            item_type: self.item_type,
            item_link: self.item_link,
            requested_quantity: self.warning_count * 2,
            user_id: self.user_id,
            request_fulfilled: false
          )
          end

          if delete_expired_ordered_item
            delete_expired_ordered_item.delete
          end

        end
     

end
