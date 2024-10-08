class MyTemplateSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :patient_template_id, :dr_template_id, :notes, :created_at, :updated_at

  def created_at 
    object.created_at.strftime("%m/%d/%Y")
  end

  def updated_at 
    object.updated_at.strftime("%m/%d/%Y")
  end
end
