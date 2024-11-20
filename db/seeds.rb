require 'aws-sdk-s3'

p"destroy all old data ♻️"

PatientTemplate.destroy_all
DrTemplate.destroy_all
Medifile.destroy_all

# Initialize the S3 client
aws_region = ENV['AWS_REGION']
s3 = Aws::S3::Resource.new(region: aws_region)

# deleting all aws bucket objects
aws_bucket_name = ENV['AWS_BUCKET']
bucket = s3.bucket(aws_bucket_name)

# Iterate and delete all objects in the bucket
bucket.objects.each do |obj|
  obj.delete
  puts "Deleted: #{obj.key}"
end

puts "All objects in the bucket '#{aws_bucket_name}' have been deleted."

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

        @record.file_link.attach(
            io: File.open(Rails.root.join(medi['file_link'])),
            filename: File.basename(medi['file_link']),
            content_type: 'application/pdf'
        )

        @record.file_cover.attach(
            io: File.open(Rails.root.join(medi['file_cover'])),
            filename: File.basename(medi['file_cover']),
            content_type: 'image/jpeg'
        )
# After attachment, update the URLs to the S3 object URLs
    if @record.file_link.attached? && @record.file_cover.attached?
    # Generate the URL for file_link (PDF)
    file_link_s3_url = Rails.application.routes.url_helpers.rails_blob_url(@record.file_link, host: "http://127.0.0.1:3000")

    # Generate the URL for file_cover (Image)
    file_cover_s3_url = Rails.application.routes.url_helpers.rails_blob_url(@record.file_cover, host: "http://127.0.0.1:3000")

    # Update the record with the new S3 URLs
    @record.update_columns(file_link: file_link_s3_url, file_cover: file_cover_s3_url)

    p "#{@record.title} medifile created and uploaded to AWS S3 with updated URLs"
  else
    p "Error: Failed to attach files for #{@record.title}"
  end
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
