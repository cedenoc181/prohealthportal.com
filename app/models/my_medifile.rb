class MyMedifile < ApplicationRecord

 after_create_commit :duplicate, unless: :duplicating?


    belongs_to :user
    belongs_to :coworker, class_name: 'User', optional: true
    belongs_to :medifile, inverse_of: :my_medifiles

    attr_accessor :is_duplicate 

 private 

#  sharing medifiles with other coworkers/ users

  def duplicate

    if self.coworker_id.present? && self.coworker_id > 0
    coworkers_copy = self.dup
    p "#{coworkers_copy} duplicate"

    coworkers_copy.user_id = self.coworker_id
    coworkers_copy.coworker_id = self.user_id
    coworkers_copy.is_duplicate = true

   if coworkers_copy.save 
       Rails.logger.info "created duplicate for coworker #{self.coworker_id} receives file on their account"
    return coworkers_copy
   else 
    Rails.logger.error "duplicate not saved:  #{coworker_copy.errors.full_messages.join(', ')}"
    return nil
    end

   else 
    Rails.logger.error "duplicate was not created because coworker was not found or input"
         return nil
     end 
    end 
  end 

  def duplicating?
    is_duplicate == true
  end


end