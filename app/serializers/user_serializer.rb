class UserSerializer < ActiveModel::Serializer
  attributes :id, :full_name, :email, :role, :clinic_location, :insurance_network, :direct_access, :admin, :created_at 
end
