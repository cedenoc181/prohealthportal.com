class ClinicSerializer < ActiveModel::Serializer
  attributes :id, :clinic_location_name, :clinic_location_address, :clinic_phone_number, :clinical_director_info, :staff

  #  has_many :users, dependent: :nullify


def staff
  object.users.where(clinic_id: object.id).map { |staff_member| 
    staff_member.slice(:id, :first_name, :last_name, :email, :role, :credentials, :phone_ext) 
  }
end 

def clinical_director_info
  object.clinical_director&.slice(:id, :first_name, :last_name, :email, :role, :credentials, :phone_ext)
end


end
