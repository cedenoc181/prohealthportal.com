class Medifile < ApplicationRecord
    has_many :my_medifiles
    has_many :users, through: :my_medifiles
end
