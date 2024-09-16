class CreateMyMedifiles < ActiveRecord::Migration[7.1]
  def change
    create_table :my_medifiles do |t|
      t.references :user, foreign_key: { to_table: :users }
      t.references :coworker, null: true, foreign_key: { to_table: :users }
      t.references :medifile, foreign_key: true
      t.string :my_file_title
      t.text :my_file_description
      t.timestamps
    end
  end
end
