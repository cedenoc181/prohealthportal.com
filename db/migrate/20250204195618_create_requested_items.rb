class CreateRequestedItems < ActiveRecord::Migration[7.1]
  def change
    create_table :requested_items do |t|
      t.references :clinic
      t.string :item_name 
      t.string :item_link
      t.string :item_type 
      t.integer :count 
      t.boolean :ordered
      t.references :user


      t.timestamps
    end
  end
end
