class UsersController < ApplicationController
  
  # Callbacks to set user before show and destroy action method
  before_action :find_user, only: %i[ show destroy update ]

  # before_action :set_user, only: %i[:forgot_password]

  # Skip authorization(from App-controller) for users to create account and update forgotten passwords only 
  skip_before_action :authorized, only: [:index, :show, :create, :forgot_password]


  # GET /users
  #will like to modify in the future so that Admin is the only user 
  #able to use index all
  def index
    @users = User.all
    render json: {users: @users}, status: :ok
  end

  # GET /users/1
  def show
    render json: @user, serializer: UserSerializer, status: :ok
  end

  def me 
    render json: current_user, status: :ok
  end

  # POST /users
  def create 
    @user = User.new(create_user_params)
    if @user.save 
      token = encode_token({user_id: user.id})
      render json: {user: UserSerializer.new(user), token: token}, status: :created
    else
      render json: { message: "Invalid user sign-up.", errors: @user.errors.full_messages }, status: :unprocessable_entity
        end
  end

  # PATCH/ Will send email to to users email account with link to update password through route to verify user
  #user will also apply email account to system, if email is in database, then user will receive email 

  # def forgot_password  

  #   if @user.present?
  #     new_password = params[:new_password]
      
  #     if new_password.present?  # Check for presence first
  #       if @user.update(password: new_password)
  #         render json: { message: "Password was updated successfully" }, status: :ok
  #       else
  #         render json: { message: "Password update failed", errors: @user.errors.full_messages }, status: :unprocessable_entity
  #       end
  #     else
  #       render json: { message: "New password cannot be blank" }, status: :unprocessable_entity
  #     end
  #   else
  #     render json: { message: "User not found" }, status: :not_found
  #   end
  # end

 # PATCH/PUT /users/:id
def update
  # Check if the user is an admin and updating another user
  if is_admin?
    if @user.update(user_editable_params)
      render json: @user
    else
      render json: @user.errors.full_messages, status: :unprocessable_entity
    end

  # Check if the current user is updating their own profile
  elsif current_user.update(user_editable_params)
    render json: current_user

  # If neither, return errors
  else
    render json: current_user.errors.full_messages, status: :unprocessable_entity
  end
end

  # DELETE method only for Admin /users/1
  def destroy
    if is_admin?
      if @user.destroy
      render json: { message: "User successfully deleted." }, status: :ok
    else 
      render json: { error: "User account could not be deleted" }, status: :unprocessable_entity
    end
  else 
    render json: { error: "You are not authorized to delete users account." }, status: :unauthorized
  end

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
