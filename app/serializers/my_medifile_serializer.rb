class MyMedifileSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :medifile_id, :my_file_title, :my_file_description, :provider_name, :created_at, :updated_at

  def created_at 
    object.created_at.strftime("%m/%d/%Y")
  end

  def updated_at 
    object.updated_at.strftime("%m/%d/%Y")
  end
end
