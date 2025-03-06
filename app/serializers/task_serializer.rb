class TaskSerializer < ActiveModel::Serializer
  attributes :id, :clinic_id, :task_table_title, :column_names, :clinic_association

  def clinic_association
    return {} unless object.clinic # Prevent errors if clinic is nil

    object.clinic.attributes.slice("clinic_location_name", "clinic_location_address")
  end
end
