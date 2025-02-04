class IventoryItem < ApplicationRecord
    belongs_to :clinic, inverse_of: :inventory_items  
    belongs_to :user, inverse_of: :inventory_items  
end
