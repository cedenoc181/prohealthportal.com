class RequestedItemSerializer < ActiveModel::Serializer
  attributes :id, :item_type, :item_name, :item_link, :count, :ordered, :created_at, :updated_at, :requested_by, :to_clinic


def requested_by
  object.user&.slice(:first_name, :last_name)
end 

def to_clinic
  object.clinic&.slice(:clinic_location_name, :clinic_location_address)
end 

end
