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

p"destroy all old data ♻️"

User.destroy_all
PatientTemplate.destroy_all
DrTemplate.destroy_all
MyTemplate.destroy_all
Medifile.destroy_all
MyMedifile.destroy_all

positions = ['admin', 'Front-Desk', 'Provider', 'Aide', 'billing', 'management']
clinics = ['eastside', 'westside', 'Upper westside', 'Bronx', 'Inwood']

p "seeding Users 🌱"
    15.times do 

    User.create(
    full_name: Faker::Name.name, 
    email: Faker::Internet.email(name: :full_name, separators:['-'], domain: 'proHealthptot.com'), 
    password: Faker::Internet.password(min_length: 6, max_length: 16), 
    role: positions.shuffle.first,
    clinic_location: clinics.shuffle.last
    )
    p"user created successfully"
    end


     p "seeding Medifiles 🌱"

     p "seeding Patient Templates 🌱"

     p "seeding Dr Templates 🌱"

     p "seeding My Medifiles 🌱"

     p "seeding My Templates 🌱"