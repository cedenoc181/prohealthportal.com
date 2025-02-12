class RenameColumnsInRequestedItems < ActiveRecord::Migration[7.1]
  def change
    rename_column :requested_items, :count, :requested_quantity
    rename_column :requested_items, :ordered, :request_fulfilled
  end
end
