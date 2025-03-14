class OrderedItemsController < ApplicationController
    before_action :find_ordered_item, only: %i[ show update destroy ]

    skip_before_action :is_admin?


    def index
        @ordered_items = OrderedItem.all
        render json: @ordered_items, each_serializer: OrderedItemSerializer, 
        status: :ok
    end

    def show 
        render json: @ordered_item, serializer: OrderedItemSerializer,
         status: :ok
    end

    def ordered_items_grouped_by_clinic
        @ordered_groups = OrderedItem.includes(:clinic).where(order_received: false).order(order_date: :desc).group_by(&:clinic_id)
        render json: @ordered_groups.transform_values { |orderedItems| ActiveModelSerializers::SerializableResource.new(orderedItems, each_serializer: OrderedItemSerializer) },
        status: :ok
    end

    def create 
        @ordered_item = OrderedItem.new(ordered_items_params)
        if authorized_to_CUD?
            if @ordered_item.save
            render json: {item: @ordered_item, message: "Ordered item has been successfully created"}, status: :created
             else 
            render json: {item: @ordered_item.errors.full_messages, message: "Ordered item was unable to be created, please check params are met and user is admin."}, status: :unprocessable_entity
            end
        else
            render json: {  
                message: "User is not authorized to perform to create Ordered item data for other clinic"
                }, status: :unauthorized   
        end
    end 



    def update 
        if authorized_to_CUD?
            if @ordered_item.update(ordered_items_params)
            render json: {item: @ordered_item, message: "#{@ordered_item.item_name} has been successfully updated"}, status: :ok
            else
            render json: {item: @ordered_item.errors.full_messages, message: "failed to update #{@ordered_item.item_name}, make sure user_id and clinic_id match item."}, status: :unprocessable_entity
            end
        else
            render json: {  
                message: "User is not authorized to update items from other clinics"
                }, status: :unauthorized   
        end  
    end 


    def destroy
        if authorized_to_CUD?
            if @ordered_item.destroy!
            render json: {message: "#{@ordered_item.item_name} was successfully deleted"}, status: :ok
            else
             render json: {message: "failed to delete #{ @ordered_item.item_name}"}, status: :unauthorized
            end
        else
            render json: {  
                message: "User is not authorized to delete items from other clinics"
                }, status: :unauthorized  
        end
    end


    private 

    def find_ordered_item
        @ordered_item = OrderedItem.find(params[:id])
        return render json: { error: "Ordered item not found" }, status: :not_found unless @ordered_item
    end

    def ordered_items_params
        params.permit(:clinic_id, :item_type, :item_name, :order_quantity, :order_date, :item_link, :order_received, :delivery_date, :user_id)
    end

    def authorized_to_CUD?
        associated_clinic = @ordered_item.clinic_id
        current_user&.admin || current_user&.clinic_id == associated_clinic
    end

end
