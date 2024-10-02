class UserSerializer < ActiveModel::Serializer
  attributes :id, :full_name, :email, :role, :clinic_location, :credentials, :insurance_network, :direct_access, :admin, :my_medifiles, :my_templates, :admin_templates

  def admin_templates
    if object.role == 'Admin'
      {
        patient_templates: object.patient_templates,
        dr_templates: object.dr_templates,
        medifiles: object.medifiles
      }
    else
      nil
    end
  end

end 