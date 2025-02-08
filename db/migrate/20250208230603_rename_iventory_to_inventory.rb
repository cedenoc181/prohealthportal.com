class RenameIventoryToInventory < ActiveRecord::Migration[7.1]
  def change
    rename_table :iventory_items, :inventory_items
  end
end
