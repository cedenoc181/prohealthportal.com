class DrTemplate < ApplicationRecord
   has_many :my_templates 
   has_many :users, through: :my_templates


      def dr_temp_validator
         unless is_admin?
            errors.add(:base, "you aren't authorized to create templates for db")
         end
      end
end
