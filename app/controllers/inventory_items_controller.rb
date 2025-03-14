class InventoryItemsController < ApplicationController
    before_action :find_item, only: %i[ show update destroy ]

    skip_before_action :is_admin?

    # skip_before_action :authorized

    def index
        @inventory_items = InventoryItem.all
        render json: @inventory_items, each_serializer: InventoryItemSerializer, status: :ok
    end 

    def show
        render json: @inventory_item, serializer: InventoryItemSerializer, status: :ok
    end 

    # fetch inventory by low stock(preview of 5)
    def low_inv_items
         @inventory_groups = InventoryItem.includes(:clinic).where(item_status: "insufficient").order(updated_at: :desc).group_by(&:clinic_id)
        render json: @inventory_groups.transform_values { |inventory| ActiveModelSerializers::SerializableResource.new(inventory, each_serializer: InventoryItemSerializer) },
        status: :ok
    end 

    # fetch inventory by item category
    def inventory_type
        inventory_types = InventoryItem.all.group_by(&:item_type)
        render json: inventory_types,
        status: :ok
    end

    # fetch inventory by clinic, show all inventroy on hand for each clinic
    def inventory_by_clinic
         @clinic_inventory = InventoryItem.includes(:clinic).group_by(&:clinic_id)
        render json: @clinic_inventory.transform_values { |inventory| ActiveModelSerializers::SerializableResource.new(inventory, each_serializer: InventoryItemSerializer) },
        status: :ok
    end 

    # this loads all the items that have been requested due to insuffiecient inventory
    def inventory_by_request_sent
        inventory_requested = InventoryItem.all.where(item_requested: true).group_by(&:clinic_id)
        render json: inventory_requested, 
        status: :ok
    end


    def create 
        @inventory_item = InventoryItem.new(inventory_items_params)
        if authorized_to_CUD?
            if @inventory_item.save
            render json: {item: @inventory_item, message: "inventory item has been successfully created"}, status: :created
             else 
            render json: {item: @inventory_item.errors.full_messages, message: "inventory item was unable to be created, please check params are met and user is admin."}, status: :unprocessable_entity
            end
        else
            render json: {  
                message: "User is not authorized to perform to create inventory data for other clinic"
                }, status: :unauthorized   
        end
    end 



    def update 
        if authorized_to_CUD?
            if @inventory_item.update(inventory_items_params)
            render json: {item: @inventory_item, message: "#{@inventory_item.item_name} has been successfully updated"}, status: :ok
            else
            render json: {item: @inventory_item.errors.full_messages, message: "failed to update #{@inventory_item.item_name}, make sure user_id and clinic_id match item."}, status: :unprocessable_entity
            end
        else
            render json: {  
                message: "User is not authorized to update items from other clinics"
                }, status: :unauthorized   
        end  
    end 


    def destroy
        if authorized_to_CUD?
            if @inventory_item.destroy!
            render json: {message: "#{@inventory_item.item_name} was successfully deleted"}, status: :ok
            else
             render json: {message: "failed to delete #{ @inventory_item.item_name}"}, status: :unauthorized
            end
        else
            render json: {  
                message: "User is not authorized to delete items from other clinics"
                }, status: :unauthorized  
        end
    end




    private 

    def find_item 
        @inventory_item = InventoryItem.find(params[:id])
    end 

    def inventory_items_params 
        params.permit(:clinic_id, :item_type, :item_name, :count, :item_status, :staple_item, :item_link, :warning_count, :item_requested, :user_id)
    end 

    def authorized_to_CUD?
        associated_clinic = @inventory_item.clinic_id
        current_user&.admin || current_user&.clinic_id == associated_clinic
    end

end
