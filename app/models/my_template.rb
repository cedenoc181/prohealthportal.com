class MyTemplate < ApplicationRecord
    belongs_to :user
    belongs_to :patient_template
    belongs_to :dr_template
end
