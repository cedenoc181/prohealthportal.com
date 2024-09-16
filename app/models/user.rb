class User < ApplicationRecord

after_create_commit :post_create_update, :update_insurance_network


    has_many :my_medifiles, dependent: :destroy
    has_many :medifiles, through: :my_medifiles

    has_many :coworker_relationships, 
    class_name: 'MyMedifile', 
    foreign_key: 'user_id'

    has_many :coworkers, 
    through: :coworker_relationships, 
    source: :coworker

    has_many :my_templates, dependent: :destroy
    has_many :patient_templates, through: :my_templates
    has_many :dr_templates, through: :my_templates


    has_secure_password

    validates :password, length: { in: 6..16 }, strict: true

    validates :email, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }, strict: true

private 

def post_create_update
  self.update_column(:admin, self.role == 'Admin')
  
  self.update_column(:direct_access, self.role == "PT" || self.role == 'OT')
end

# could be temperary
def update_insurance_network
  insurance_accepted = ['United Health Care', 'Fidelis Care', 'Metroplus', 'BCBS', 'Atnea', 'Emblem Health', 'Oxford', 'Medicare', 'Cigna']
    if self.role == 'PT' || self.role == 'OT'
      self.update_column(:insurance_network, insurance_accepted.join(", "))
    end
end

end
