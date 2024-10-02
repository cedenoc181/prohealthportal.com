class DrTemplateSerializer < ActiveModel::Serializer
  attributes :id, :dr_temp_title, :dr_temp_subject, :dr_temp_content, :category
end
