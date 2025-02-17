require 'rails_helper'

RSpec.describe Medifile, type: :model do

  include ActionDispatch::TestProcess # ✅ Required for `fixture_file_upload`

  let!(:clinic) { Clinic.create!(clinic_location_name: "East", clinic_location_address: "1041 3rd ave") }

  let(:user) { User.create!(email: "christian@gmail.com", password: "123456", first_name: "christian", last_name: "cedeno", admin: true, clinic_id: clinic.id) }

  let(:medifile) { 
    Medifile.create!( 
    title: "medifile test", 
    description: "test description", 
    instructions: "test instructions", 
    file_link: fixture_file_upload(Rails.root.join('db/ProHealthPDF/Auth-Orthonet.pdf'), 'application/pdf'), # ✅ Attach file
    file_cover: fixture_file_upload(Rails.root.join('db/ProHealthPDFcover/Orthonet.jpg'), 'image/jpeg'),
    file_cover_alt: "file cover alt", 
    language: "English", 
    file_owner_id: user.id
    ) }
  

    describe "File Upload" do
      it "attaches a valid PDF and image" do
        expect(medifile.file_link).to be_attached # ✅ Checks if file is attached
        expect(medifile.file_cover).to be_attached # ✅ Checks if image is attached
      end
    end
end
