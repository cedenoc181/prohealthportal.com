class CreateMyTemplates < ActiveRecord::Migration[7.1]
  def change
    create_table :my_templates do |t|
      t.references :user, null: false, foreign_key: true
      t.references :patient_template, null: true, foreign_key: true
      t.references :dr_template, null: true, foreign_key: true
      t.timestamps
    end
  end
end
