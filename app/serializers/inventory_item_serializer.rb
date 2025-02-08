class InventoryItemSerializer < ActiveModel::Serializer
  attributes :id, :item_type, :item_name, :count, :item_status, :created_at, :updated_at, :added_by, :to_clinic

  def added_by
    object.user&.slice(:first_name, :last_name)
  end 
  
  def to_clinic
    object.clinic&.slice(:clinic_location_name, :clinic_location_address)
  end 
end
