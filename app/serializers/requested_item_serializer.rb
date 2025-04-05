class RequestedItemSerializer < ActiveModel::Serializer
  attributes :id, :item_type, :item_name, :item_link, :requested_quantity, :request_fulfilled, :created_at, :updated_at, :clinic_id, :requested_by, :to_clinic

def requested_by
  object.user&.slice(:first_name, :last_name)
end 

def to_clinic
  object.clinic&.slice(:clinic_location_name, :clinic_location_address)
end 

def created_at 
  object.created_at.strftime("%m/%d/%Y")
end

def updated_at 
  object.updated_at.strftime("%m/%d/%Y")
end

end
