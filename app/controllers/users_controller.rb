class UsersController < ApplicationController
  rescue_from ActiveRecord::RecordNotFound, with: :render_record_not_found
  before_action :find_user, only: %i[ show destroy ]
  skip_before_action :authorized, only: [:create :forgot_password]


  # GET /users
  def index
    users = User.all
    render json: users, status: :ok
  end

  # GET /users/1
  def show
    render json: user, serializer: UserSerializer, status: :ok
  end

  def me 
    render json: current_user, status: :ok
  end

  # POST /users
  def create
    user = User.create!(create_user_params)
    token = encode_token({user_id: user.id})
    render json: {user: UserSerializer.new(user), jwt: token}, status: :created
  end

  def forgot_password
    user = find_user
  
    if user.present?
      new_password = params[:new_password]  
      if user.update(password: new_password)
        render json: { message: "Password was updated" }, status: :ok
      else
        render json: { message: "Password update failed" }, status: :unprocessable_entity
      end
    else
      render json: { message: "User not found" }, status: :not_found
    end
  end



 # PATCH/PUT /users/:id
def update
  # Check if the user is an admin and updating another user
  if isAdmin?
    user = find_user
    if user.update(user_editable_params)
      render json: user
    else
      render json: user.errors, status: :unprocessable_entity
    end

  # Check if the current user is updating their own profile
  elsif current_user.update(user_editable_params)
    render json: current_user

  # If neither, return errors
  else
    render json: current_user.errors, status: :unprocessable_entity
  end
end

  # DELETE /users/1
  def destroy
    begin
      user.destroy!
      render json: { message: "User successfully deleted." }, status: :ok
    rescue ActiveRecord::RecordNotDestroyed => e
      render json: { error: "User could not be deleted: #{e.message}" }, status: :unprocessable_entity
    end
  end

  private

  def isAdmin?
    current_user.admin?
  end

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
