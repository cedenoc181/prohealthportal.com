class CreateMyMedifiles < ActiveRecord::Migration[7.1]
  def change
    create_table :my_medifiles do |t|
      t.references :user, foreign_key: true
      t.references :medifile, foreign_key: true
      t.string :my_file_title
      t.text :my_file_description
      t.string :provider_name, default: "no provider associated"
      t.timestamps
    end
  end
end
