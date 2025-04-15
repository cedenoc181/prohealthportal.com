class TaskSerializer < ActiveModel::Serializer
  attributes :id, :clinic_id, :task_table_title, :column_names

  # def clinic_association
  #   return {} unless object.clinic # Prevent errors if clinic is nil

  #   object.clinic.attributes.slice("clinic_location_name", "clinic_location_address")
  # end

  has_many :task_contents

  def column_names
    unordered = object.column_names || {}

    # Define your desired order of keys
    desired_order = %w[column_one column_two column_three column_four]

    # Return an ordered hash
    desired_order.each_with_object({}) do |key, hash|
      hash[key] = unordered[key] if unordered[key].present?
    end
  end


end
