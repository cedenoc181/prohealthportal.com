class Medifile < ApplicationRecord
    validate :validate_files

    has_many :my_medifiles, inverse_of: :medifile
    has_many :users, through: :my_medifiles

    has_one_attached :file_link
    has_one_attached :file_cover

    private 

    def validate_files 
        if !file_link.attached?
            errors.add(:file_link, "must be attached")
          end
      
          if !file_cover.attached?
            errors.add(:file_cover, "must be attached")
         end
    end




end
