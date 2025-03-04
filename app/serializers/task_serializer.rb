class TaskSerializer < ActiveModel::Serializer
  attributes :id, :clinic_id, :task_table_title, :column_names

  belongs_to :clinic
end
