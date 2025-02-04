class Clinic < ApplicationRecord
    has_many :requested_items, inverse_of: :clinic
    has_many :inventory_items, inverse_of: :clinic
    has_many :ordered_items, inverse_of: :clinic
    has_many :users, inverse_of: :clinic
  end
  
