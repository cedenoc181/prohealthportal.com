class MyMedifile < ApplicationRecord
    belongs_to :user
    belongs_to :coworker, class_name: 'User', optional: true
    belongs_to :medifile
end
