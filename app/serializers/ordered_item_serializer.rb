class OrderedItemSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :clinic_id, :item_type, :item_name, :count, :order_date, :created_at, :updated_at
end
