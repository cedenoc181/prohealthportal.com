class RequestedItemSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :clinic_id, :item_type, :item_name, :item_link, :count, :created_at, :updated_at

  private 

  def clinic_orders
    object.clinics.group_by(&:clinic_id)
  end
end
