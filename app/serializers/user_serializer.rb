class UserSerializer < ActiveModel::Serializer
  attributes :id, :clinic_id, :first_name, :last_name, :email, :role, :clinic_location, :credentials, :insurance_network, :direct_access, :admin, :phone_ext, :reset_password_token, :reset_password_sent_at


  def created_at 
    object.created_at.strftime("%m/%d/%Y")
  end

  def updated_at 
    object.updated_at.strftime("%m/%d/%Y")
  end

end 