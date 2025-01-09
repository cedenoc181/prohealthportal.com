class DrTemplateSerializer < ActiveModel::Serializer
  attributes :id, :dr_temp_title, :dr_temp_subject, :dr_temp_content, :category, :users, :created_at, :updated_at

  def created_at 
    object.created_at.strftime("%m/%d/%Y")
  end

  def updated_at 
    object.updated_at.strftime("%m/%d/%Y")
  end
end
