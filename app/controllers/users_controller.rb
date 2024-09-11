class UsersController < ApplicationController
  before_action :set_user, only: %i[ show update destroy ]

  # GET /users
  def index
    users = User.all
    render json: users, status: :ok
  end

  # GET /users/1
  def show
    user = find_user
    render json: user, status: :ok
  end

  # POST /users
  def create
    user = User.create!(create_user_params)
    render json: user

  end


  # PATCH/PUT /users/1
  def update
    if user.update(user_params)
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
      params.permit()
    end
end
