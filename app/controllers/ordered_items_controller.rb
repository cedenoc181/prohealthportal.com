class OrderedItemsController < ApplicationController
    before_action :find_ordered_item, only: %i[ show update destroy ]

    skip_before_action :is_admin?, only: %i[ show index ]


    def index
        @ordered_items = OrderedItem.all
        render json: @ordered_items, each_serializer: OrderedItemSerializer, status: :ok
    end

    def show 
        render json:  @ordered_item, serializer: OrderedItemSerializer, status: :ok
    end

    def create
        @ordered_item = OrderedItem.new(ordered_items_params)
        if @ordered_item.save
            render json: {ordered_item: @ordered_item, message: "ordered item: #{@ordered_item.item_name} has been created"}, status: :created
        else 
            render json: {ordered_item: @ordered_item.errors.full_messages, message: "failed to create ordered item row"}, status: :unprocessable_entity
        end
    end

    def update 
        if @ordered_item.update(ordered_items_params)
            render json: {ordered_item: @ordered_item, message: "ordered item: #{@ordered_item.item_name} has been updated"}, stats: :ok
        else
            render json: {ordered_item: @ordered_item.errors.full_messages, message: "failed to update ordered item"}, status: :unprocessable_entity
        end
    end

    def destroy 
        if @ordered_item.destroy!
            render json: {ordered_item: "#{@ordered_item.item_name} has been deleted"}, status: :ok
        else
            render json: {ordered_item: @ordered_item.errors.full_messages}, status: :unprocessable_entity
        end
    end

    private 

    def find_ordered_item
        @ordered_item = OrderedItem.find(params[:id])
    end

    def ordered_items_params
        params.permit(:clinic_id, :item_type, :item_name, :order_quantity, :order_date, :item_link, :order_received, :delivery_date, :user_id)
    end

end
