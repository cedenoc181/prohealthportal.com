class MedifileSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :instructions, :file_link, :file_cover, :file_cover_alt, :language, :file_editable
end
