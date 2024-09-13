class User < ApplicationRecord

after_create_commit :post_create_update


    has_many :my_medifiles, dependent: :destroy
    has_many :medifiles, through: :my_medifiles

    has_many :my_templates, dependent: :destroy
    has_many :patient_templates, through: :my_templates
    has_many :dr_templates, through: :my_templates


    has_secure_password

    validates :password, length: { in: 6..16 }
    validates :email, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP },  strict: true

    # format: { with: /\A.*(?=.*\d)(?=.*[!@#$%^&*]).*\z/,
    #   message: 'must contain at least one digit and one special character'}


private 

def post_create_update
  self.update_column(:admin, self.role == 'admin')
  
  self.update_column(:direct_access, self.role == "Provider")
end

end
