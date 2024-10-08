class CreatePatientTemplates < ActiveRecord::Migration[7.1]
  def change
    create_table :patient_templates do |t|
      t.string :px_temp_title
      t.string :px_temp_subject
      t.text :px_temp_content
      t.string :category #retention, follow up, inquiry, HEP, B-day, review-acknowledgement etc.
      t.string :language, default: "english" #spanish or english
      t.timestamps
    end
  end
end

# px = patient 