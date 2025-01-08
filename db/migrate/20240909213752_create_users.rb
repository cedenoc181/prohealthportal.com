class CreateUsers < ActiveRecord::Migration[7.1]
  def change
    create_table :users do |t|
      t.string :first_name
      t.string :last_name
      t.string :email
      t.string :password_digest
      t.string :role    #staff, provider, admin
      t.string :credentials
      t.string :clinic_location
      t.string :phone_ext
      t.string :insurance_network, default: "Not Provided"
      t.boolean :direct_access
      t.boolean :admin, default: false
      t.timestamps
    end
  end
end
