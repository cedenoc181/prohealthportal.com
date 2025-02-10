class InventoryItem < ApplicationRecord
    belongs_to :clinic, inverse_of: :inventory_items  
    belongs_to :user 

    around_save :item_status_update

    private

    def item_status_update 
            self.item_requested = count < warning_count
            self.item_status = count < warning_count ? "insufficient" : "sufficient"
        yield 
    end

end
