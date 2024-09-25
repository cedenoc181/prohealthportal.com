class Medifile < ApplicationRecord
    has_many :my_medifiles
    has_many :users, through: :my_medifiles

    has_one_attached :file_link
    has_one_attached :file_cover

    private 

    # def aws_medifile_update
    #     self.update(
    #         self.file_link = ,
    #           self.file_cover =
    #     )
    # end

end
