class AddPxOwnerIdToPatientTemplate < ActiveRecord::Migration[7.1]
  def change
    add_column :patient_templates, :px_owner_id, :integer
    add_index :patient_templates, :px_owner_id, if_not_exists: true
  end
end
