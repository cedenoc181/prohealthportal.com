class CreateDrTemplates < ActiveRecord::Migration[7.1]
  def change
    create_table :dr_templates do |t|

      t.timestamps
    end
  end
end
