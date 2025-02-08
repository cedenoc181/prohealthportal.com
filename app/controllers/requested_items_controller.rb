class RequestedItemsController < ApplicationController
    before_action :find_requested_item, only: %i[ show update delete ]

    skip_before_action :is_admin?, only: %i[ show index ]


    def index
        @requested_items = RequestedItem.all
        render json: @requested_items, each_serializer: RequestedItemSerializer, status: :ok
    end

    def show 
        render json: @requested_item, each_serializer: RequestedItemSerializer, status: :ok
    end

    def create
        @requested_item = RequestedItem.new(requested_items_params)
        if @requested_item.save
            render json: {ordered_item: @requested_item, message: "requested item: #{@requested_item.item_name} has been created"}, status: :created
        else 
            render json: {ordered_item: @requested_item.errors.full_messages, message: "failed to create request item row"}, status: :unprocessable_entity
        end
    end

    def update 
        if @requested_item.update(requested_items_params)
            redner json: {ordered_item: @requested_item, message: "requested item: #{@requested_item.item_name} has been updated"}, stats: :ok
        else
            render json: {ordered_item: @requested_item.errors.full_messages, message: "failed to update requested item"}, status: :unprocessable_entity
        end
    end

    def delete 
        if @requested_item.destroy
            render json: {ordered_item: "#{@requested_item.item_name} has been deleted"}, status: :ok
        else
            render json: {ordered_item: @requested_item.errors.full_messages}, status: :unprocessable_entity
        end
    end

    private 

    def find_requested_item
        @requested_item = RquestedItem.find(params[:id])
    end
    
    def requested_items_params
        params.permit(:clinic_id, :item_name, :item_link, :item_type, :count, :ordered, :user_id)
    end
end
