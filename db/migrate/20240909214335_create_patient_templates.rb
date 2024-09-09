class CreatePatientTemplates < ActiveRecord::Migration[7.1]
  def change
    create_table :patient_templates do |t|

      t.timestamps
    end
  end
end
