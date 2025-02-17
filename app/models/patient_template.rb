class PatientTemplate < ApplicationRecord
   has_many :my_templates 
   has_many :users, through: :my_templates

   validates :px_temp_title, :category, :px_owner_id, presence: true

end
