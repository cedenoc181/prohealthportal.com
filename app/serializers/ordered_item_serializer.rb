class OrderedItemSerializer < ActiveModel::Serializer
  attributes :id, :item_type, :item_name, :count, :order_date, :created_at, :updated_at, :ordered_by, :to_clinic

  def ordered_by
    object.user&.slice(:first_name, :last_name)
  end 
  
  def to_clinic
    object.clinic&.slice(:clinic_location_name, :clinic_location_address)
  end 
end
