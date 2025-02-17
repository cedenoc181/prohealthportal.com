class DrTemplate < ApplicationRecord
   has_many :my_templates 
   has_many :users, through: :my_templates

   validates :dr_temp_title, :category, :dr_owner_id, presence: true


end
