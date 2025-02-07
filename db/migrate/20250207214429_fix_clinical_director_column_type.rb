class FixClinicalDirectorColumnType < ActiveRecord::Migration[7.1]
  def change
    change_column :clinics, :clinical_director, :bigint, using: 'clinical_director::bigint'
    add_foreign_key :clinics, :users, column: :clinical_director
end
end
