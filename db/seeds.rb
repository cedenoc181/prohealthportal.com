# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).

# require 'faker'

p"destroy all old data ♻️"

PatientTemplate.destroy_all
DrTemplate.destroy_all
Medifile.destroy_all


################################################################################
# p "testing data model seeding"
# positions = ['Admin', 'Front-Desk', 'PT', 'OT', 'PTA', 'OTA', 'Aide', 'Billing', 'Management']
# clinics = ['Eastside', 'Westside', 'Upper westside', 'Bronx', 'Inwood']

# p "seeding test Users 🌱"
#     15.times do 

#     User.create(
#     full_name: Faker::Name.name, 
#     email: Faker::Internet.email(name: :full_name, separators:['-'], domain: 'proHealthptot.com'), 
#     password: Faker::Internet.password(min_length: 6, max_length: 16), 
#     role: positions.shuffle.first,
#     clinic_location: clinics.shuffle.last
#     )
#     p"test user created successfully"
#     end
################################################################################################

    #database seeds

     p "seeding Medifiles 🌱"


     p "seeding Patient Templates 🌱"
patient_templates_data = YAML.load_file(Rails.root.join('db', 'patient_templates_seed.yml'))

    patient_templates_data.each do |patient|  
        PatientTemplate.create!(**patient)        
        p "patient template created successfully"

    end

     p "seeding Dr Templates 🌱"

dr_templates_data = YAML.load_file(Rails.root.join('db', 'dr_templates_seed.yml'))

dr_templates_data.each do |doctor|
        DrTemplate.create!(**doctor)
         p "doctor templates created successfully"

end
