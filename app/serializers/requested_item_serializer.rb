class RequestedItemSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :clinic_id, :item_type, :item_name, :item_link, :count, :created_at, :updated_at
end
