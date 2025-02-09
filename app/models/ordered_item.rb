class OrderedItem < ApplicationRecord
    belongs_to :clinic, inverse_of: :ordered_items
    belongs_to :user
end
