class Medifile < ApplicationRecord
    has_many :my_medifiles
    has_many :users, through: :my_medifiles

    has_one_attached :file_link
    has_one_attached :file_cover
end
