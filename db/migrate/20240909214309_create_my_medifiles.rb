class CreateMyMedifiles < ActiveRecord::Migration[7.1]
  def change
    create_table :my_medifiles do |t|

      t.timestamps
    end
  end
end
