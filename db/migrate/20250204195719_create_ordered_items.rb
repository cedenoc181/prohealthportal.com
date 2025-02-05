class CreateOrderedItems < ActiveRecord::Migration[7.1]
  def change
    create_table :ordered_items do |t|
      t.references :clinic
      t.string :item_type
      t.string :item_name 
      t.integer :count 
      t.date :order_date
      t.boolean :received
      t.date :delivery_date
      t.references :user

      t.timestamps
    end
  end
end
