class UsersController < ApplicationController
  
  # Callbacks to set user before show and destroy action method
  before_action :find_user, only: %i[ show destroy update ]

  # before_action :set_user, only: %i[:forgot_password]
  skip_before_action :is_admin?, only: %i[me update]

  # GET /users
  #will like to modify in the future so that Admin is the only user 
  #able to use index all
  def index
    @users = User.all
    render json: @users, each_serializer: UserSerializer, status: :ok
  end
  # GET /users/1
  def show
    render json: @user, serializer: UserSerializer, status: :ok
  end

  def me 
    render json: current_user, status: :ok
  end

  # POST /users
  # Only admin of appliacation are abled to create a new user to avoid random access, and must be authroized to do so 
  def create 
    @user = User.new(create_user_params)
    if @user.save 
      token = encode_token({user_id: @user.id})
      render json: {user: UserSerializer.new(@user), token: token}, status: :created
    else
      render json: { message: "Invalid user sign-up.", errors: @user.errors.full_messages }, status: :unprocessable_entity
        end
  end

 # PATCH/PUT /users/:id
# cant update user without being logged in(authorized)
def update
    if @user.update(user_editable_params)
      render json: @user
  elsif current_user.update(user_editable_params)
    render json: current_user
  end
end

  # DELETE method only for Admin /users/1
  # cant destroy user without being logged in(authorized) and being a admin(is_admin?)
  def destroy
       @user.destroy!
  end


  private

    # Use callbacks to share common setup or constraints between actions.
    def find_user
      @user = User.find(params[:id])
    end

    def set_user 
      @user = User.find_by(email: params[:email])
    end

    # Only allow a list of trusted parameters through.
    def create_user_params
      params.permit(:full_name, :email, :password, :clinic_location, :role)
    end

    def user_editable_params 
      params.permit(:clinic_location, :password, :email, :role, :insurance_network, :direct_access, :admin)
    end

end
