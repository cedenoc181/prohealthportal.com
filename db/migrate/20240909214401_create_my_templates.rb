class CreateMyTemplates < ActiveRecord::Migration[7.1]
  def change
    create_table :my_templates do |t|
      t.references :user_id, foreign_key: true
      t.references :patient_template_id, foreign_key: true
      t.references :dr_template_id, foreign_key: true
      t.text :notes
      t.timestamps
    end
  end
end
