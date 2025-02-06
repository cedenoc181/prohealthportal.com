class RequestedItemsController < ApplicationController
    before_action :find_item, only: %i[ show update destroy ]

    skip_before_action :is_admin?, only: %i[ show index ]


    def index

    end

    def show 

    end

    def create

    end

    def update 

    end

    def delete 

    end

    private 

    
end
