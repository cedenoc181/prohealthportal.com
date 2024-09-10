class MedifileSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :file_link, :file_cover, :file_cover_alt, :publish_date, :language, :file_editable
end
