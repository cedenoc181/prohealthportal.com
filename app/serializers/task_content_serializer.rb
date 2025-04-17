class TaskContentSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :task_id, :task_data

  belongs_to :task

  def task_data
    unordered = object.task_data || {}

    # Define your desired order of keys
    desired_order = %w[column_one column_two column_three column_four]

    # Return an ordered hash
    desired_order.each_with_object({}) do |key, hash|
      hash[key] = unordered[key] if unordered[key].present?
    end
  end
end
