class CreateMedifiles < ActiveRecord::Migration[7.1]
  def change
    create_table :medifiles do |t|

      t.timestamps
    end
  end
end
