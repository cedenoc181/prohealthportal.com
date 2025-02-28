class CreateTaskContents < ActiveRecord::Migration[7.1]
  def change
    create_table :task_contents do |t|
      t.references :task, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true
      t.jsonb :task_data, default: {}, null: false
      t.timestamps
    end
  end
end
