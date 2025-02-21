class RequestedItemsController < ApplicationController
    before_action :find_requested_item, only: %i[ show update destroy ]

    skip_before_action :is_admin?, except: %i[ requested_items_for_clinics]


    def index
        @requested_items = RequestedItem.all
        render json: {item: @requested_items, each_serializer: RequestedItemSerializer}, status: :ok
    end

    def show 
        render json: {item: @requested_item, serializer: RequestedItemSerializer}, status: :ok
    end

    def requested_items_for_clinics
        requested_items = RequestedItem.includes(:clinic).group_by(&:clinic_id)
        
        render json: requested_items.transform_values { |items| ActiveModelSerializers::SerializableResource.new(items, each_serializer: RequestedItemSerializer) },
        status: :ok
    end

    # if i wanted to isolate the ordered items 
    # def ordered_items
    #     requested_items_ordered = RequestedItem.all.where(ordered: true).group_by(&:clinic_id)
    #     render json: requested_items_ordered, status: :ok
    # end


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
            render json: {ordered_item: @requested_item, message: "requested item: #{@requested_item.item_name} has been updated"}, stats: :ok
        else
            render json: {ordered_item: @requested_item.errors.full_messages, message: "failed to update requested item"}, status: :unprocessable_entity
        end
    end

    def destroy 
        if @requested_item.destroy!
            render json: {ordered_item: "#{@requested_item.item_name} has been deleted"}, status: :ok
        else
            render json: {ordered_item: @requested_item.errors.full_messages}, status: :unprocessable_entity
        end
    end

    private 

    def find_requested_item
     @requested_item = RequestedItem.find(params[:id])

        if @requested_item.nil?
             render json: { message: "item not found", error: @requested_items.errors.full_messages}, status: :not_found
       end
    end
    
    def requested_items_params
        params.permit(:clinic_id, :item_name, :item_link, :item_type, :requested_quantity, :request_fulfilled, :user_id)
    end
end
