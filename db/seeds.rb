# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

require 'faker'


positions = ['Front-Desk', 'Provider', 'Aide', 'billing', 'management']
clinics = ['eastside', 'westside', 'Upper westside', 'Bronx', 'Inwood']
random_boolean = [true, false]

def d_a_providers 
  unless  user.role == 'provider'
    user.direct_access = false
  end

end

15.times do User.create!(
    full_name: Faker::Name.name, 
    email: Faker.Internet.email(name: :full_name, seperators:['-'], domain: 'proHealthptot.com'), 
    password: Faker.Internet.password(min_length: 6, max_length: 16), 
    role: positions.shuffle.first,
    clinic_location: clinics.shuffle.last,
    direct_access: :d_a_providers,
    admin: 
)