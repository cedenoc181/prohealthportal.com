class MyTemplateSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :patient_template_id, :dr_template_id, :notes, :created_at, :updated_at
end
