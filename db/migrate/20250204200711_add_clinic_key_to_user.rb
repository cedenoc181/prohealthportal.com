class AddClinicKeyToUser < ActiveRecord::Migration[7.1]
  def change
    add_reference :users, :clinic, foreign_key: true
  end
end
