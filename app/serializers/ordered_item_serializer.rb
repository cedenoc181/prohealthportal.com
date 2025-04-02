class OrderedItemSerializer < ActiveModel::Serializer
  attributes :id, :item_type, :item_name, :item_link, :delivery_date, :order_quantity, :order_received, :order_date, :order_updated_at, :ordered_by, :to_clinic

  def ordered_by
    object.user&.slice(:first_name, :last_name)
  end 
  
  def to_clinic
    object.clinic&.slice(:clinic_location_name, :clinic_location_address)
  end 

  # def order_date 
  #   object.order_date.strftime("%m/%d/%Y")
  # end

  # def delivery_date
  #   object.delivery_date.strftime("%m/%d/%Y")
  # end

  def order_updated_at
    object.updated_at.strftime("%m/%d/%Y")
  end
end
