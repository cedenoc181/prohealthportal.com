class User < ApplicationRecord
    has_many :my_medifiles, dependent: :destroy
    has_many :medifiles, through: :my_medifiles

    has_many :my_templates, dependent: :destroy
    has_many :patient_templates, through: :my_templates
    has_many :dr_templates, through: :my_templates


    has_secure_password

    validates :password, length: { in: 6..16 }, strict: true
    validates :email, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP },  strict: true

    validates_each :full_name do |record, attr, value|
        record.errors.add(attr, 'must start with upper case') if /\A[[:lower:]]/.match?(value)
      end
end
