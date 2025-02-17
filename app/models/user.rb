class User < ApplicationRecord

  after_create_commit :post_create_update
  
    # relationships 
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

    belongs_to :clinic

    has_many :requested_items, through: :clinics

    has_many :ordered_items, through: :clinics

    has_many :inventory_items, through: :clinics

    # validations required for user instance to be commited
    has_secure_password

    validates :password, length: { in: 6..16 }, allow_nil: true

    validates :first_name, :last_name, :clinic_id, presence: true 

    validates :email, presence: true, uniqueness: { case_sensitive: false }, format: { with: URI::MailTo::EMAIL_REGEXP }, strict: true

      # Generates a new password reset token and sets the timestamp
    def generate_password_token!
      update(reset_password_token: generate_token, reset_password_sent_at: Time.now.utc)
    end

    # Checks if the password reset token is expired (set to 2 hours)
    def password_token_valid?
      reset_token_expiration_time > Time.now
    end

    # Resets the password and clears the reset token
    def reset_password!(new_password)
      update(password: new_password, reset_password_token: nil)
    end

  private 

    def reset_token_expiration_time
      self.reset_password_sent_at + 2.hours
    end

    def generate_token
      SecureRandom.hex(10)
    end


    def post_create_update

      insurance_accepted = ['United Health Care', 'Fidelis Care', 'Metroplus', 'BCBS', 'Atnea', 'Emblem Health', 'Oxford', 'Medicare', 'Cigna']

      attributes = {
        email: email&.downcase,
        first_name: first_name&.downcase,
        last_name: last_name&.downcase,
        clinic_location: self.clinic.clinic_location_name
      }
    
      attributes[:role] = "Admin" if self.admin?  # Only assign role if admin
      
        if self.role == 'PT' || self.role == 'OT'
          attributes[:insurance_network] = insurance_accepted.join(", ")
        else
          attributes[:insurance_network] = "not provided"
        end

      self.update!(attributes)
    end

end
