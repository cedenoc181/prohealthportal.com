class AddItemLinkToOrderedItem < ActiveRecord::Migration[7.1]
  def change
    add_column :ordered_items, :item_link, :text, default: "", null: false
  end
end
