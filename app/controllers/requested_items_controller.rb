class RequestedItemsController < ApplicationController
    before_action :find_requested_item, only: %i[ show update destroy ]

    skip_before_action :is_admin?, except: %i[ requested_items_for_clinics]


    def index
        @requested_items = RequestedItem.all
        render json: {requested_item: @requested_items, each_serializer: RequestedItemSerializer}, status: :ok
    end

    def show 
        render json: {requested_item: @requested_item, serializer: RequestedItemSerializer}, status: :ok
    end

    def requested_items_for_clinics
        @requested_items = RequestedItem.includes(:clinic).group_by(&:clinic_id)
        render json: @requested_items.transform_values { |items| ActiveModelSerializers::SerializableResource.new(items, each_serializer: RequestedItemSerializer) },
        status: :ok
    end

    # if i wanted to isolate the ordered items 
    # def ordered_items
    #     requested_items_ordered = RequestedItem.all.where(ordered: true).group_by(&:clinic_id)
    #     render json: requested_items_ordered, status: :ok
    # end

    def create 
        @requested_item = OrderedItem.new(requested_items_params)
        if authorized_to_CUD?
            if @requested_item.save
            render json: {item: @requested_item, message: "requested item has been successfully created"}, status: :created
             else 
            render json: {item: @requested_item.errors.full_messages, message: "requested item was unable to be created, please check params are met and user is admin."}, status: :unprocessable_entity
            end
        else
            render json: {  
                message: "User is not authorized to perform to create Ordered item data for other clinic"
                }, status: :unauthorized   
        end
    end 

    def update 
        if authorized_to_CUD?
            if @requested_item.update(requested_items_params)
            render json: {item: @requested_item, message: "#{@requested_item.item_name} has been successfully updated"}, status: :ok
            else
            render json: {item: @requested_item.errors.full_messages, message: "failed to update #{@requested_item.item_name}, make sure user_id and clinic_id match item."}, status: :unprocessable_entity
            end
        else
            render json: {  
                message: "User is not authorized to update items from other clinics"
                }, status: :unauthorized   
        end  
    end 


    def destroy
        if authorized_to_CUD?
            if @requested_item.destroy!
            render json: {message: "#{@requested_item.item_name} was successfully deleted"}, status: :ok
            else
             render json: {message: "failed to delete #{ @requested_item.item_name}"}, status: :unauthorized
            end
        else
            render json: {  
                message: "User is not authorized to delete items from other clinics"
                }, status: :unauthorized  
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


    def authorized_to_CUD?
        associated_clinic = @requested_item.clinic_id
        current_user&.admin || current_user&.clinic_id == associated_clinic
    end
end
