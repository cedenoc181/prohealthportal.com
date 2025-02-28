class TaskContent < ApplicationRecord
    belongs_to :user
    belongs_to :task


    validates :task_id, presence: true
    validates :user_id, presence: true
    validates :task_data, presence: true
end
