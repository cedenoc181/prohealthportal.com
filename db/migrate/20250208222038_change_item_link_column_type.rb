class ChangeItemLinkColumnType < ActiveRecord::Migration[7.1]
  def change
    change_column :requested_items, :item_link, :text
  end
end
