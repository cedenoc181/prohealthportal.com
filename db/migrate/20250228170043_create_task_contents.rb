class CreateTaskContents < ActiveRecord::Migration[7.1]
  def change
    create_table :task_contents do |t|

      t.timestamps
    end
  end
end
