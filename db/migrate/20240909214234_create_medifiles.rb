class CreateMedifiles < ActiveRecord::Migration[7.1]
  def change
    create_table :medifiles do |t|
      t.string :title
      t.text :description
      t.string :file_link
      t.string :file_cover
      t.string :file_cover_alt
      t.date :publish_date
      t.string :language
      t.boolean :file_editable, default: false
      t.timestamps
    end
  end
end
