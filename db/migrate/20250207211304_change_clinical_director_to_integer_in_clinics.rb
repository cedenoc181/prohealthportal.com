class ChangeClinicalDirectorToIntegerInClinics < ActiveRecord::Migration[7.1]
  def change
    change_column :clinics, :clinical_director, :bigint
    add_foreign_key :clinics, :users, column: :clinical_director, primary_key: :id
  end
end
