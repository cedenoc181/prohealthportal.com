class IventoryItemSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :clinic_id, :item_type, :item_name, :count, :item_status, :created_at, :updated_at
end
