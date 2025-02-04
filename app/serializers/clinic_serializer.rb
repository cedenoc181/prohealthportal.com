class ClinicSerializer < ActiveModel::Serializer
  attributes :id, :clinic_location_name, :clinic_location_address, :clinic_phone_number, :clinical_director
end
