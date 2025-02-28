class Task < ApplicationRecord

    belongs_to :clinic
    has_many :task_contents
    has_many :users, through: :task_contents

    validates :task_table_title, presence: true
    validates :column_names, presence: true
    validates :clinic_id, presence: true
end
