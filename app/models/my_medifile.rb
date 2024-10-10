class MyMedifile < ApplicationRecord

after_create_commit :duplicate

    belongs_to :user
    belongs_to :coworker, class_name: 'User', optional: true
    belongs_to :medifile




private 

def duplicate

    coworkers_copy = self.dup
    p "#{coworkers_copy} duplicate"

    coworkers_copy.user_id = self.coworker_id
    coworkers_copy.coworker_id = self.user_id

    coworkers_copy.save
end 


end
