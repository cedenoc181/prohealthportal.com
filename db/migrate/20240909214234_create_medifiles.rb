class CreateMedifiles < ActiveRecord::Migration[7.1]
  def change
    create_table :medifiles do |t|
      t.string :title
      t.text :description
      t.text :instructions
      t.string :file_link
      t.string :file_cover
      t.string :file_cover_alt
      t.string :language
      t.integer :file_owner_id
      t.integer :file_receiver_id

      t.timestamps
    end
  end
end
