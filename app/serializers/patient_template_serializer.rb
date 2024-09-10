class PatientTemplateSerializer < ActiveModel::Serializer
  attributes :id, :px_temp_title, :px_temp_content, :category, :language
end
