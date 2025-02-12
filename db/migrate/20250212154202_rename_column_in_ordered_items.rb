class RenameColumnInOrderedItems < ActiveRecord::Migration[7.1]
  def change
    rename_column :ordered_items, :count, :order_quantity
    rename_column :ordered_items, :received, :order_received
  end
end
