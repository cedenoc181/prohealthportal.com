class TaskContentSerializer < ActiveModel::Serializer
  attributes :id, :task_id, :user_id, :task_data

  belongs_to :task
  belongs_to :user
end
