class AddDrOwnerIdToDrTemplate < ActiveRecord::Migration[7.1]
  def change
    add_column :dr_templates, :dr_owner_id, :integer
    add_index :dr_templates, :dr_owner_id, if_not_exists: true
  end
end
