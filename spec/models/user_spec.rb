require 'rails_helper'

RSpec.describe User, type: :model do

  let!(:clinic) { Clinic.create!(clinic_location_name: "East", clinic_location_address: "1041 3rd ave") }

  let(:admin_user) { User.create!(email: "USER@gmail.com", password: "123456", first_name: "JOHN", last_name: "DOE", admin: true, clinic_id: clinic.id) }

  let(:user) { User.create!(email: "NONADMINUSER@gmail.com", password: "123456", first_name: "cHristIAN", last_name: "CeDeNo", admin: false, clinic_id: clinic.id) }

    describe "#post_create_update" do 
      it "should update admin user attributes" do 
        expect(admin_user.reload.role).to eq("Admin")
        expect(admin_user.reload.clinic_location).to eq(clinic.clinic_location_name)
        expect(admin_user.reload.email).to eq("user@gmail.com")
        expect(admin_user.reload.first_name).to eq("john")
        expect(admin_user.reload.last_name).to eq("doe")
        expect(admin_user.reload.insurance_network).to eq("not provided")
      end

      it "should update non admin and non providers(PT or OT) user attributes" do 
        expect(user.reload.clinic_location).to eq(clinic.clinic_location_name)
        expect(user.reload.email).to eq("nonadminuser@gmail.com")
        expect(user.reload.first_name).to eq("christian")
        expect(user.reload.last_name).to eq("cedeno")
        expect(user.reload.insurance_network).to eq("not provided")
      end

      it "if user role is PT or OT? insurance network should be populated" do 
        pt_user = User.create!(email: "pt@gmail.com", password: "123456", first_name: "OscaR", last_name: "Moises", role: "PT", admin: false, clinic_id: clinic.id) 
        ot_user = User.create!(email: "ot@gmail.com", password: "123456", first_name: "AleX", last_name: "Burgo", role: "OT", admin: false, clinic_id: clinic.id)

        # PT
        expect(pt_user.reload.insurance_network).to eq("United Health Care, Fidelis Care, Metroplus, BCBS, Atnea, Emblem Health, Oxford, Medicare, Cigna")

        # OT
        expect(ot_user.reload.insurance_network).to eq("United Health Care, Fidelis Care, Metroplus, BCBS, Atnea, Emblem Health, Oxford, Medicare, Cigna")

      end

    end

end
