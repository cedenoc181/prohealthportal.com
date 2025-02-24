class OrderedItem < ApplicationRecord
    belongs_to :clinic, inverse_of: :ordered_items
    belongs_to :user

    has_many :inventory_items, through: :clinic

    after_save :update_inventory

    validates :clinic_id, :user_id, presence: true

    validates :item_name, :item_type, presence: true


    private 

    # automated update for when order is received
    # make sure delievery date on the ui is mandatory before order instance made


    def update_inventory
        return unless self.delivery_date 
        return unless Date.today >= self.delivery_date && self.saved_change_to_order_received?(from: false, to: true)
        return unless self.clinic_id.present?

        exisiting_inventory = self.clinic.inventory_items.find_by(item_name: self.item_name, clinic_id: self.clinic_id)

        if exisiting_inventory
            # current count plus ordered count
            exisiting_inventory.update(
                count: exisiting_inventory.count + self.order_quantity,
            )
        else 
            self.clinic.inventory_items.create!(
                clinic_id: self.clinic_id,
                user_id: self.user_id,
                item_name: self.item_name,
                item_type: self.item_type,
                count: self.order_quantity,
                warning_count: self.order_quantity / 2,
                item_link: self.item_link
            )
        end
    end
end
