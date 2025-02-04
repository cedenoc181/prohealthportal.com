class CreateIventoryItems < ActiveRecord::Migration[7.1]
  def change
    create_table :iventory_items do |t|
      t.references :clinic
      t.string :item_type 
      t.string :item_name 
      t.integer :count 
      t.string :item_status 
      t.references :user



      t.timestamps
    end
  end
end
