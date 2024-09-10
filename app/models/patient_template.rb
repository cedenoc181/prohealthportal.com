class PatientTemplate < ApplicationRecord
   has_many :my_templates 
   has_many :users, through: :my_templates
end
