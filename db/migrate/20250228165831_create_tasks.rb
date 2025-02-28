class CreateTasks < ActiveRecord::Migration[7.1]
  def change
    create_table :tasks do |t|
      t.references :clinic, null: false, foreign_key: true
      t.string :task_table_title
      t.jsonb :column_names, default: {}, null: false
      t.timestamps
    end
  end
end
