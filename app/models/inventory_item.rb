class InventoryItem < ApplicationRecord
    belongs_to :clinic, inverse_of: :inventory_items  
    belongs_to :user 
    has_many :requested_items, through: :clinic

    around_save :item_status_update
    after_save :request_insufficient_item

    private

    def request_insufficient_item
        if self.saved_change_to_item_requested?(from: false, to: true)
            self.clinic.requested_items.create!(
                clinic_id: self.clinic_id, 
                item_name: self.item_name, 
                item_type: self.item_type,
                item_link: self.item_link,
                count: self.warning_count * 2,
                user_id: self.user_id,
                ordered: false
            )
        end
    end

    def item_status_update 
            self.item_requested = count < warning_count
            self.item_status = count < warning_count ? "insufficient" : "sufficient"
        yield 
    end

end
