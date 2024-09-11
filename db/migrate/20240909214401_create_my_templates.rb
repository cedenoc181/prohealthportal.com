class CreateMyTemplates < ActiveRecord::Migration[7.1]
  def change
    create_table :my_templates do |t|
      t.references :user, null: false, foreign_key: true
      t.references :patient_template, null: true, foreign_key: true
      t.references :dr_template, null: true, foreign_key: true
      t.text :notes
      t.integer :responded_counter, default: 0, null: false
      t.integer :no_response_counter, default: 0, null: false
      t.float :effectiveness, default: 0.0, null: false
      t.timestamps
    end
  end
end
