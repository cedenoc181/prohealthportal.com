# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).

# require 'faker'

p"destroy all old data ♻️"

User.destroy_all
PatientTemplate.destroy_all
DrTemplate.destroy_all
MyTemplate.destroy_all
Medifile.destroy_all
MyMedifile.destroy_all

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

     p "seeding users 🌱"


     p "seeding Medifiles 🌱"

     p "seeding Patient Templates 🌱"

patient_templates_array = [
    {
        title: "Inquiry to Continue PT/OT",
        subject: "Follow-Up: Continuing Your Physical Therapy",
        body: "Dear [Patient Name],\n\nWe hope this message finds you well. We’re reaching out to see if you’re ready to continue your physical therapy sessions. Please let us know if you’d like to schedule your next appointment or if you have any questions about your treatment plan.\n\nBest regards,\n[Your Name]\nproHealth and Fitness PT OT\n212-600-4781",
        category: "Patient Outreach",
        language: "english"
      },
      {
        title: "New Potential Patient Follow-Up",
        subject: "Thank You for Your Interest in proHealth and Fitness PT OT",
        body: "Dear [Patient Name],\n\nThank you for your interest in our physical therapy services. We wanted to follow up on your recent inquiry and see if you would like to schedule an appointment or if you need any additional information.\n\nPlease feel free to contact us at 212-600-4781 or reply to this email.\n\nBest regards,\n[Your Name]\nproHealth and Fitness PT OT\n212-600-4781",
        category: "Patient Outreach",
        language: "english"
      },
      {
        title: "Appointment Reminder",
        subject: "Reminder: Upcoming Physical Therapy Appointment",
        body: "Dear [Patient Name],\n\nThis is a reminder of your physical therapy appointment scheduled for [Date] at [Time].\n\nIf you need to reschedule or have any questions, please call us at 212-600-4781 or email [Email Address].\n\nThank you,\n[Your Name]\nproHealth and Fitness PT OT\n212-600-4781",
        category: "Appointment Reminder",
        language: "english"
      },
      {
        title: "Home Exercises Plan of Care Follow-Up",
        subject: "How Are Your Home Exercises Going?",
        body: "Dear [Patient Name],\n\nWe wanted to check in and see how you’re progressing with your home exercise plan. Are you experiencing any challenges or improvements?\n\nPlease let us know if you need any adjustments to your plan or if you have any questions. We’re here to support you.\n\nBest regards,\n[Your Name]\nproHealth and Fitness PT OT\n212-600-4781",
        category: "Patient Outreach",
        language: "english"
      },
      {
        title: "Check-In on Sick Patient",
        subject: "Checking In – How Are You Feeling?",
        body: "Dear [Patient Name],\n\nI hope you’re feeling better. I wanted to check in and see how you’re recovering from your illness. If you need to reschedule your upcoming appointments or have any concerns, please let us know.\n\nWishing you a speedy recovery,\n[Your Name]\nproHealth and Fitness PT OT\n212-600-4781",
        category: "Patient Outreach",
        language: "english"
      }, 
      {
        title: "Billing Inquiry Received",
        subject: "Your Billing Inquiry Has Been Received",
        body: "Dear [Patient Name],\n\nWe have received your billing inquiry. Our billing department will review the details to ensure there was no error in the statement. We will reach out to you shortly with an update.\n\nThank you for your patience,\n[Your Name]\nproHealth and Fitness PT OT\n212-600-4781",
        category: "Billing",
        language: "english"
      },
      {
        title: "Billing Statement Confirmation",
        subject: "Confirmation: Billing Statement Details",
        body: "Dear [Patient Name],\n\nAfter reviewing your billing statement, we confirm that the charges reflect the services provided for the specified dates. Unfortunately, the insurance did not cover these services. If you have further questions or need assistance, please contact us.\n\nBest regards,\n[Your Name]\nproHealth and Fitness PT OT\n212-600-4781",
        category: "Billing",
        language: "english"
      },
      {
        title: "Billing Statement Error",
        subject: "Action Required: Billing Statement Error",
        body: "Dear [Patient Name],\n\nPlease disregard the billing statement you received as it was sent in error. We apologize for any confusion this may have caused. If you have any questions or need further assistance, please contact us.\n\nThank you,\n[Your Name]\nproHealth and Fitness PT OT\n212-600-4781",
        category: "Billing",
        language: "english"
      },
      {
        title: "Insurance Denial – No More Visits Approved",
        subject: "Update: Insurance Denial for Additional Visits",
        body: "Dear [Patient Name],\n\nUnfortunately, your insurance has denied coverage for additional visits. We will be reaching out to you soon to discuss the next steps for your plan of care and explore alternative options.\n\nThank you for your patience,\n[Your Name]\nproHealth and Fitness PT OT\n212-600-4781",
        category: "Insurance Denial",
        language: "english"
      },
      {
        title: "Insurance Approval for Additional Visits",
        subject: "Great News: Additional Visits Approved by Insurance",
        body: "Dear [Patient Name],\n\nWe are pleased to inform you that your insurance has approved [X] additional visits for you to continue with your plan of care. Please contact us to schedule your next appointments.\n\nBest regards,\n[Your Name]\nproHealth and Fitness PT OT\n212-600-4781",
        category: "Insurance Denial",
        language: "english"
      },
      {
        title: "Appealing Insurance Denial",
        subject: "Action: Appealing Your Insurance Denial",
        body: "Dear [Patient Name],\n\nWe are currently appealing your insurance denial. Please be patient as we contact your insurance provider to understand the reason for their decision and to see what we can do to appeal it. We will keep you updated on the progress.\n\nThank you for your patience,\n[Your Name]\nproHealth and Fitness PT OT\n212-600-4781",
        category: "Insurance Denial",
        language: "english"
      }, 
      #spanish
      {
        title: "Consulta para Continuar PT/OT",
        subject: "Seguimiento: Continuación de su Terapia Física",
        body: "Estimado/a [Patient Name],\n\nEsperamos que este mensaje le encuentre bien. Nos dirigimos a usted para saber si está listo/a para continuar con sus sesiones de terapia física. Por favor, háganos saber si desea programar su próxima cita o si tiene alguna pregunta sobre su plan de tratamiento.\n\nAtentamente,\n[Your Name]\nproHealth and Fitness PT OT\n212-600-4781",
        category: "Alcance de Pacientes",
        language: "spanish"
      },
      {
        title: "Seguimiento a Nuevo Paciente Potencial",
        subject: "Gracias por su Interés en proHealth and Fitness PT OT",
        body: "Estimado/a [Patient Name],\n\nGracias por su interés en nuestros servicios de terapia física. Queríamos hacer un seguimiento de su reciente consulta y ver si desea programar una cita o si necesita información adicional.\n\nNo dude en contactarnos al 212-600-4781 o responder a este correo electrónico.\n\nAtentamente,\n[Your Name]\nproHealth and Fitness PT OT\n212-600-4781",
        category: "Alcance de Pacientes",
        language: "spanish"
      },
      {
        title: "Recordatorio de Cita",
        subject: "Recordatorio: Próxima Cita de Terapia Física",
        body: "Estimado/a [Patient Name],\n\nEste es un recordatorio de su cita de terapia física programada para el [Date] a las [Time]. Por favor.\n\nSi necesita reprogramar o tiene alguna pregunta, por favor llámenos al 212-600-4781 o envíenos un correo a [Email Address].\n\nGracias,\n[Your Name]\nproHealth and Fitness PT OT\n212-600-4781",
        category: "Recordatorio de Cita",
        language: "spanish"
      },
      {
        title: "Seguimiento del Plan de Ejercicios en Casa",
        subject: "¿Cómo Van Sus Ejercicios en Casa?",
        body: "Estimado/a [Patient Name],\n\nQueríamos hacer un seguimiento y ver cómo está progresando con su plan de ejercicios en casa. ¿Está experimentando algún desafío o mejora?\n\nPor favor, infórmenos si necesita ajustes en su plan o si tiene alguna pregunta. Estamos aquí para apoyarle.\n\nAtentamente,\n[Your Name]\nproHealth and Fitness PT OT\n212-600-4781",
        category: "Alcance de Pacientes",
        language: "spanish"
      },
      {
        title: "Chequeo de Paciente Enfermo",
        subject: "Chequeo – ¿Cómo Se Siente?",
        body: "Estimado/a [Patient Name],\n\nEspero que se sienta mejor. Quería hacer un seguimiento y ver cómo está recuperándose de su enfermedad. Si necesita reprogramar sus próximas citas o tiene alguna preocupación, por favor háganoslo saber.\n\nDeseándole una pronta recuperación,\n[Your Name]\nproHealth and Fitness PT OT\n212-600-4781",
        category: "Alcance de Pacientes",
        language: "spanish"
      }, 
      {
        title: "Consulta de Facturación Recibida",
        subject: "Su Consulta de Facturación Ha Sido Recibida",
        body: "Estimado/a [Patient Name],\n\nHemos recibido su consulta de facturación. Nuestro departamento de facturación revisará los detalles para asegurar que no hubo un error en el estado de cuenta. Nos pondremos en contacto con usted pronto con una actualización.\n\nGracias por su paciencia,\n[Your Name]\nproHealth and Fitness PT OT\n212-600-4781",
        category: "Facturación",
        language: "spanish"
      },
      {
        title: "Confirmación de Estado de Cuenta",
        subject: "Confirmación: Detalles del Estado de Cuenta",
        body: "Estimado/a [Patient Name],\n\nDespués de revisar su estado de cuenta, confirmamos que los cargos reflejan los servicios proporcionados en las fechas especificadas. Lamentablemente, el seguro no cubrió estos servicios. Si tiene más preguntas o necesita asistencia, por favor contáctenos.\n\nAtentamente,\n[Your Name]\nproHealth and Fitness PT OT\n212-600-4781",
        category: "Facturación",
        language: "spanish"
      },
      {
        title: "Error en Estado de Cuenta",
        subject: "Acción Requerida: Error en Estado de Cuenta",
        body: "Estimado/a [Patient Name],\n\nPor favor, ignore el estado de cuenta que recibió ya que fue enviado por error. Pedimos disculpas por cualquier confusión que esto haya causado. Si tiene alguna pregunta o necesita más ayuda, contáctenos.\n\nGracias,\n[Your Name]\nproHealth and Fitness PT OT\n212-600-4781",
        category: "Facturación",
        language: "spanish"
      },
      {
        title: "Negación de Seguro – No Aprobación de Más Visitas",
        subject: "Actualización: Negación de Seguro para Visitas Adicionales",
        body: "Estimado/a [Patient Name],\n\nLamentablemente, su seguro ha negado la cobertura para visitas adicionales. Nos pondremos en contacto con usted pronto para discutir los siguientes pasos para su plan de cuidado y explorar opciones alternativas.\n\nGracias por su paciencia,\n[Your Name]\nproHealth and Fitness PT OT\n212-600-4781",
        category: "Negación de Seguro",
        language: "spanish"
      },
      {
        title: "Aprobación de Seguro para Visitas Adicionales",
        subject: "Buenas Noticias: Visitas Adicionales Aprobadas por el Seguro",
        body: "Estimado/a [Patient Name],\n\nNos complace informarle que su seguro ha aprobado [X] visitas adicionales para continuar con su plan de cuidado. Por favor, contáctenos para programar sus próximas citas.\n\nAtentamente,\n[Your Name]\nproHealth and Fitness PT OT\n212-600-4781",
        category: "Negación de Seguro",
        language: "spanish"
      },
      {
        title: "Apelación de Negación de Seguro",
        subject: "Acción: Apelando su Negación de Seguro",
        body: "Estimado/a [Patient Name],\n\nActualmente estamos apelando su negación de seguro. Por favor, tenga paciencia mientras contactamos a su proveedor de seguros para entender la razón de su decisión y ver qué podemos hacer para apelar. Le mantendremos informado sobre el progreso.\n\nGracias por su paciencia,\n[Your Name]\nproHealth and Fitness PT OT\n212-600-4781",
        category: "Negación de Seguro",
        language: "spanish"
      }
    ]

    patient_templates_array.map do |patient|
        PatientTemplate.create!(
            px_temp_title: patient[:title],
            px_temp_subject: patient[:subject],
            px_temp_content: patient[:body],
            category: patient[:category],
            language: patient[:language]
        )
        p "patient template created successfully"
    end



     p "seeding Dr Templates 🌱"

     p "seeding My Medifiles 🌱"

     p "seeding My Templates 🌱"