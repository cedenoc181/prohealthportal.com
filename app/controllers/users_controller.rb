class UsersController < ApplicationController
  rescue_from ActiveRecord::RecordNotFound, with: :render_record_not_found
  before_action :find_user, only: %i[ show update destroy ]

  # GET /users
  def index
    users = User.all
    render json: users, status: :ok
  end

  # GET /users/1
  def show
    render json: user, status: :ok
  end

  # POST /users
  def create
    user = User.create!(create_user_params)
    render json: user

  end

  # PATCH/PUT /users/1
  def update
    if user.update(user_editable_params)
      render json: user
    else
      render json: user.errors, status: :unprocessable_entity
    end
  end

  # DELETE /users/1
  def destroy
    user.destroy!
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def find_user
      user = User.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def create_user_params
      params.permit(:full_name, :email, :password, :clinic_location, :role)
    end

    def user_editable_params 
      params.permit(:clinic_location, :password, :email, :role, :insurance_network, :direct_access, :admin)
    end

    def render_record_not_found 
      render json: { error: "User not found" }, status: :not_found 
    end 


end
