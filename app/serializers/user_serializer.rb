class UserSerializer < ActiveModel::Serializer
  attributes :id, :full_name, :email, :role, :clinic_location, :insurance_network, :direct_access, :admin

  # attribute :created_at do |object|
  #   object.created_at.strftime("%B %d, %Y")
  # end

  has_many :my_medifiles

  has_many :my_templates

end
