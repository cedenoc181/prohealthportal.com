
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

         medifiles = YAML.load_file(Rails.root.join('db', 'medifiles_seed.yml'))
     
         medifiles.each do |medi|
        @record = Medifile.create!(
            title: medi['title'],
            description: medi['description'],
            instructions: medi['instructions'],
            file_cover_alt: medi['file_cover_alt'],
            language: medi['language'],
            file_editable: medi['file_editable']
        )
        begin
        @record.file_link.attach(
            io: File.open(Rails.root.join(medi['file_link'])),
            filename: File.basename(medi['file_link']),
            content_type: 'application/pdf'
        )
    rescue StandardError => e
        p "Error loading medifiles_seed.yml: #{e.message}"
     end

        @record.file_cover.attach(
            io: File.open(Rails.root.join(medi['file_cover'])),
            filename: File.basename(medi['file_cover']),
            content_type: 'image/jpeg'
        )

p "#{@record.title} medifile have been created successfully and uploaded to aws s3"
    end
        p "medifiles have been seeded"

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
