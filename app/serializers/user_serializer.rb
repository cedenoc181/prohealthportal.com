class UserSerializer < ActiveModel::Serializer
  attributes :id, :full_name, :email, :role, :clinic_location, :insurance_network, :direct_access, :admin, :my_medifiles, :my_templates, :admin_templates

  def admin_templates
    if object.role == 'Admin'
      object.patient_templates
      object.dr_templates
      object.medifiles
    else
      nil
    end
  end

end 