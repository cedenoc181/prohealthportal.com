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

    def create
        # admins can create any clinic
         if current_user.admin?
            @ordered_item = OrderedItem.new(ordered_items_params)
            if @ordered_item.save
                render json: {ordered_item: @ordered_item, message: "ordered item: #{@ordered_item.item_name} has been created"}, 
                status: :created
             else 
                render json: {ordered_item: @ordered_item.errors.full_messages, message: "failed to create ordered item, check parameters used."}, 
                status: :unprocessable_entity
            end
                # else block confirms that non admins can only create their own clinic
         else
         @ordered_item = OrderedItem.new(ordered_items_params)
          order_from_clinic_staff = current_user.clinic_id == @ordered_item.clinic_id
            if order_from_clinic_staff && @ordered_item.save
                render json: {ordered_item: @ordered_item, message: "ordered item: #{@ordered_item.item_name} has been created"}, 
                status: :created
              else 
                render json: { ordered_item: @ordered_item.errors.full_messages, message: "failed to create ordered item, check parameters used." }, 
                status: :unprocessable_entity
            end
        end
    end

    def update 
        if current_user.admin?
             if @ordered_item.update(ordered_items_params)
                 render json: {ordered_item: @ordered_item, message: "ordered item: #{@ordered_item.item_name} has been updated"}, 
                 status: :ok
             else
                 render json: {error: @ordered_item.errors.full_messages, message: "failed to update ordered item"}, 
                 status: :unprocessable_entity
             end
         else 
            update_from_clinic_staff = current_user.clinic_id == @ordered_item.clinic_id
            if update_from_clinic_staff && @ordered_item.update(ordered_items_params)
                render json: {ordered_item: @ordered_item, message: "ordered item: #{@ordered_item.item_name} has been updated"},
                 status: :ok
            else
                render json: {error: @ordered_item.errors.full_messages, message: "failed to update ordered item"}, 
                status: :unauthorized
            end
        end
    end

    def destroy 
        if current_user.admin?
            if @ordered_item.destroy
                render json: {message: "#{@ordered_item.item_name} has been deleted"},
                status: :ok
            else
                render json: {error: @ordered_item.errors.full_messages, message: "failed to delete item"}, 
                status: :unprocessable_entity
            end
        else
         destroy_from_clinic_staff = current_user.clinic_id == @ordered_item.clinic_id
            if destroy_from_clinic_staff && @ordered_item.destroy
                render json: {message: "#{@ordered_item.item_name} has been deleted"},
                status: :ok
            else
                render json: {error: @ordered_item.errors.full_messages, message: "failed to delete item, make sure item is from your clinic"}, 
                status: :unauthorized
            end
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

end
