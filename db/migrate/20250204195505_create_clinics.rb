class CreateClinics < ActiveRecord::Migration[7.1]
  def change
    create_table :clinics do |t|
      t.string :clinic_location_name
      t.string :clinic_location_address
      t.string :clinic_phone_number, default: "212-600-4781"
      t.string :clinical_director
      
      t.timestamps
    end
  end
end
