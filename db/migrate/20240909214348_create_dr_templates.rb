class CreateDrTemplates < ActiveRecord::Migration[7.1]
  def change
    create_table :dr_templates do |t|
      t.string :dr_temp_title
      t.string :dr_temp_subject
      t.text :dr_temp_content
      t.string :category #POC, follow up, referral, APOS-letter, etc.
      t.timestamps
    end
  end
end
