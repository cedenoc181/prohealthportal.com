class RequestedItem < ApplicationRecord
    belongs_to :clinic, inverse_of: :requested_items 
    belongs_to :user

    has_many :ordered_items, through: :clinic

    after_update :ordered_fulfilled

    validates :clinic_id, :user_id, :requested_quantity, presence: true

    validates :item_name, :item_type, presence: true

    private 

    # once a requested item is request_fulfilled(true), then method checks for if ordered_item instance exist,
    # if it does then it updates the exisiting as a new order creation, if not exist then it creates one.


        def ordered_fulfilled
            return unless self.saved_change_to_request_fulfilled?(from: false, to: true) || self.saved_change_to_request_fulfilled?(from: nil, to: true)
            return unless self.clinic_id.present?

            order_exits = self.clinic.ordered_items.find_by(clinic_id: self.clinic_id, item_name: self.item_name)

            if order_exits
                order_exits.update(
                    order_received: false, 
                    order_date: Date.today,
                    user_id: self.user_id
                )
            else
                self.clinic.ordered_items.create!(
                    clinic_id: self.clinic_id, 
                    user_id: self.user_id, 
                    item_type: self.item_type,
                    item_name: self.item_name, 
                    item_link: self.item_link,
                    order_quantity: self.requested_quantity, 
                    order_date: Date.today,
                    order_received: false
                )
            end
            
        end

end
