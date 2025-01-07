class UserSerializer < ActiveModel::Serializer
  attributes :id, :full_name, :email, :role, :clinic_location, :credentials, :insurance_network, :direct_access, :admin, :created_at, :updated_at, :patient_templates, :dr_templates


  def created_at 
    object.created_at.strftime("%m/%d/%Y")
  end

  def updated_at 
    object.updated_at.strftime("%m/%d/%Y")
  end

end 