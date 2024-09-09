class CreateMyTemplates < ActiveRecord::Migration[7.1]
  def change
    create_table :my_templates do |t|
      t.references :user_id
      t.references :patient_template_id
      t.references :dr_template_id
      t.text :notes
      t.timestamps
    end
  end
end
