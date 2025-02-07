class IventoryItemsController < ApplicationController
    before_action :find_item, only: %i[ show update destroy ]

    skip_before_action :is_admin?, only: %i[ show index ]

def index
    @clinics = Clinic.all
    render json: @inventory_item, each_serializer: InventoryItemSerializer, status: :ok
end 

def show
    render json: @inventory_item, serializer: InventoryItemSerializer, status: :ok
end 

def create 
    @inventory_item = InventoryItem.new(inventory_items_params)
    if @inventory_item.save
        render json: {item: @inventory_item, message: "clinic has been successfully created"}, status: :created
    else 
        render json: {item: @inventory_item.errors.full_messages, message: "clinic was unable to be created, please check params are met."}, status: :unprocessable_entity
    end
end 

def update 
    if  @inventory_item.update(inventory_items_params)
        render json: {item: @inventory_item, message: "#{@inventory_item.item_name} has been successfully updated"}, status: :ok
    else
        render json: {item: @inventory_item.errors.full_messages, message: "failed to update #{@inventory_item.item_name}, please check params have been met"}, status: :unprocessable_entity
    end
end 

def destroy

    if  @inventory_item.destroy
        render json: {message: "#{@inventory_item} was successfully deleted"}, status: :ok
        else
         render json: {message: "failed to delete #{ @inventory_item}"}
    end

end




private 

def find_item 
    @inventory_item = InventoryItem.find(param[:id])
end 

def inventory_items_params 
    params.permit(:clinic_id, :item_type, :item_name, :count, :item_status, :staple_item, :item_link, :warning_count, :item_requested, :user_id)
end 

end
