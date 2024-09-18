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

    medifiles_array = [
        {
            
        }
    
    
    
    ]

     p "seeding Patient Templates 🌱"
patient_templates_data = YAML.load_file(Rails.root.join('db', 'patient_templates_seed.yml'))

    patient_templates_data.each do |patient|  
        PatientTemplate.create!(**patient)        
        p "patient template created successfully"

    end

     p "seeding Dr Templates 🌱"

 dr_templates_array = [
    {
             title: "Update on Patient's Plan of Care",
             subject: "Request for Update on Patient's Plan of Care",
             body: "Dear Dr. [Doctor's Last Name],\n\nI am reaching out to request an update on the current plan of care for our mutual patient, [Patient Name]. Could you please provide any recent changes or developments?\n\nThank you for your assistance,\n[Your Name]\nproHealth and Fitness PT OT\n212-600-4781",
             category: "Plan of care"
                 },
          {
            title: "Patient's Post-Surgery Protocol",
            subject: "Inquiry About Patient's Post-Surgery Protocol",
            body: "Dear Dr. [Doctor's Last Name],\n\nI am seeking information on the post-surgery protocol for our patient, [Patient Name]. Could you please provide the guidelines and any specific instructions we need to follow?\n\nThank you for your cooperation,\n[Your Name]\nproHealth and Fitness PT OT\n212-600-4781",
            category: "Protocols"
          },
          {
            title: "Status of Document Sent for Signature",
            subject: "Follow-Up: Document Sent for Signature",
            body: "Dear Dr. [Doctor's Last Name],\n\nI am following up on the document we sent to you via fax that requires your signature. Could you please provide an update on its status?\n\nThank you for your prompt attention,\n[Your Name]\nproHealth and Fitness PT OT\n212-600-4781",
            category: "Signature follow up"
          },
          {
            title: "Thank You for the Referral",
            subject: "Thank You for Referring [Patient Name]",
            body: "Dear Dr. [Doctor's Last Name],\n\nThank you for referring [Patient Name] to our clinic. We appreciate your trust in our services and look forward to working with you to provide the best care for [Patient Name].\n\nBest regards,\n[Your Name]\nproHealth and Fitness PT OT\n212-600-4781",
            category: "Referred to us"
          },
          {
            title: "Updated Referral Needed for PT",
            subject: "Request for Updated Referral for Physical Therapy",
            body: "Dear Dr. [Doctor's Last Name],\n\nWe require an updated referral for [Patient Name] to continue their physical therapy treatment. Could you please provide the updated referral at your earliest convenience?\n\nThank you for your assistance,\n[Your Name]\nproHealth and Fitness PT OT\n212-600-4781",
            category: "Referral/ RX"
          },
          {
              title: "Introduction to Our Clinic",
              subject: "Introduction to proHealth and Fitness PT OT",
              body: "Dear Dr. [Doctor's Last Name],\n\nI hope this email finds you well. My name is [Your Name], and I am reaching out from proHealth and Fitness PT OT. While we haven’t had the opportunity to work together with any mutual patients yet, I wanted to introduce our clinic and the services we offer, including physical and occupational therapy. We are committed to providing personalized care and would love the opportunity to collaborate in the future.\n\nPlease feel free to reach out if you’d like to learn more.\n\nBest regards,\n[Your Name]\nproHealth and Fitness PT OT\n212-600-4781",
              category: "Introduction"
            },
            {
              title: "Patient Not Following Plan of Care",
              subject: "Patient [Patient Name] is Not Following Plan of Care",
              body: "Dear Dr. [Doctor's Last Name],\n\nI am writing to inform you that our mutual patient, [Patient Name], has not been following the prescribed plan of care for their treatment. We wanted to bring this to your attention and see if you have any recommendations or if adjustments need to be made to encourage adherence.\n\nThank you for your input and guidance,\n[Your Name]\nproHealth and Fitness PT OT\n212-600-4781",
              category: "Plan of care"
            },
            {
              title: "Follow-Up on Patient We Referred",
              subject: "Follow-Up: Patient [Patient Name] Referred to You",
              body: "Dear Dr. [Doctor's Last Name],\n\nI hope all is well. We recently referred [Patient Name] to your office for further evaluation and treatment. Could you kindly provide an update on their status and any recommendations for continued care on our end?\n\nThank you for your collaboration,\n[Your Name]\nproHealth and Fitness PT OT\n212-600-4781",
              category: "Referral follow-up"
            },
            {
              title: "Setting Up a Meeting",
              subject: "Request to Set Up a Meeting",
              body: "Dear Dr. [Doctor's Last Name],\n\nI am writing to see if we could arrange a meeting to discuss [topic of interest]. I believe a conversation would be beneficial to align on our approaches and collaborate more effectively for the benefit of our patients.\n\nPlease let me know your availability at your earliest convenience.\n\nBest regards,\n[Your Name]\nproHealth and Fitness PT OT\n212-600-4781",
              category: "Meeting request"
            },
            {
              title: "APOS Treatment Review and Approval",
              subject: "APOS Treatment Plan for Patient [Patient Name]",
              body: "Dear Dr. [Doctor's Last Name],\n\nWe have evaluated your patient, [Patient Name], and they meet the requirements for APOS treatment based on their diagnosis of [diagnosis code], which includes [condition]. Please review the attached APOS treatment plan, and kindly sign off on the document. Once signed, you can fax it back to us at [fax].\n\nHere are the details for your reference:\n\nClinic: [clinic]\nPhone: [phone]\nAddress: [address]\nDoctor NPI: [dr. npi number]\n\nIf you have any questions or require further information, please do not hesitate to reach out.\n\nThank you for your attention to this matter.\n\nBest regards,\n[Your Name]\nproHealth and Fitness PT OT\n212-600-4781",
              category: "APOS Treatment"
            }
    
]

dr_templates_array.map do |doctor|
    DrTemplate.create!(
        dr_temp_title: doctor[:title],
        dr_temp_subject: doctor[:subject],
        dr_temp_content: doctor[:body],
        category: doctor[:category],
    )
    p "doctor templates created successfully"
end
