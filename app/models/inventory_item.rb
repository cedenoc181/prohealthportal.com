class InventoryItem < ApplicationRecord
    belongs_to :clinic, inverse_of: :inventory_items  
    belongs_to :user 
end
