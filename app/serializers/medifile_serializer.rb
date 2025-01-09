class MedifileSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers

  attributes :id, :title, :description, :instructions, :file_cover_alt, :language, :file_owner_id, :file_receiver_id, :file_link_url, :file_cover_url, :created_at, :updated_at


def file_link_url 
  if object.file_link.attached?
    rails_blob_url(object.file_link, only_path: true)
  end
end

def file_cover_url 
    if object.file_cover.attached?
      rails_blob_url(object.file_cover, only_path: true)
    end
end

def created_at 
  object.created_at.strftime("%m/%d/%Y")
end

def updated_at 
  object.updated_at.strftime("%m/%d/%Y")
end

end
