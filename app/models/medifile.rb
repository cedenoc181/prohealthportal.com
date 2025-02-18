class Medifile < ApplicationRecord

    has_many :my_medifiles, inverse_of: :medifile
    has_many :users, through: :my_medifiles

    has_one_attached :file_link
    has_one_attached :file_cover

    # add some validations

    validates :file_link, presence: true
    validates :file_cover, presence: true
    validates :title, :file_owner_id, :description, presence: true


end




