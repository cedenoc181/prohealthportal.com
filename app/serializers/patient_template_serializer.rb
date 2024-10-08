class PatientTemplateSerializer < ActiveModel::Serializer
  attributes :id, :px_temp_title, :px_temp_subject, :px_temp_content, :category, :language, :created_at, :updated_at

  def created_at 
    object.created_at.strftime("%m/%d/%Y")
  end

  def updated_at 
    object.updated_at.strftime("%m/%d/%Y")
  end
end
