class RequestedItem < ApplicationRecord
    belongs_to :clinic, inverse_of: :requested_items 
    belongs_to :user

end
