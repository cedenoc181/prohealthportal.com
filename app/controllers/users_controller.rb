class UsersController < ApplicationController
  
  # Callbacks to set user before show and destroy action method
  before_action :find_user, only: %i[ show destroy]
  # remove index show create from admin restrictions
  skip_before_action :is_admin?
  # will take skip before action authroized method off after development, bc admin will be only user avaiilable to perform CRUD


  # GET /users
  #Admin is the only user that can index and show
  def index
    @users = User.all
    render json: @users, status: :ok
  end
  # GET /users/1
  def show
    render json: @user, serializer: UserSerializer, status: :ok
  end

  #  GET /my-account
  # logged in users are able to use me action 
  def me 
    render json: current_user, status: :ok
  end

  # POST /users
  # Only admin of appliacation are abled to create a new user to avoid random access, and must be authroized to do so 
  def create 
    @user = User.new(create_user_params)
    if @user.save 
      token = encode_token({user_id: @user.id})
      render json: {user: UserSerializer.new(@user), message: "User successfully created", token: token}, status: :created
    else
      render json: { message: "Invalid user sign-up.", errors: @user.errors.full_messages }, status: :unprocessable_entity
        end
  end

  def user_create_patient_template
    new_patient_temp = current_user.patient_templates.create!(patient_template_params)
     render json: { message: "User patient template successfully created"}, status: :created
  end

  def user_create_dr_template
    new_dr_temp = current_user.dr_templates.create!(dr_template_params)
      render json: { message: "User doctor template successfully created"}, status: :created
  end

  

 # PATCH/PUT /users/:id
# cant update user without being logged in(authorized)
def update
  if current_user.admin? 
    @user = User.find(params[:id])
    if @user.update(user_editable_params)
      render json:  @user, serializer: UserSerializer, message: "user attributes have been successfully updated", status: :ok
    else
      render json: @user.errors.full_messages, status: :unprocessable_entity
    end
  else
    # Non-admin users can only update their own info
    if current_user.update(user_editable_params)
      render json: current_user
    else
      render json: current_user.errors.full_messages, status: :unprocessable_entity
    end
  end
end

  # DELETE method only for Admin /users/1
  # cant destroy user without being logged in(authorized) and being a admin(is_admin?)
  def destroy
       if @user.destroy!
       render json: {message: "#{user.full_name} user account has been successfully deleted"}, status: :ok
       else 
        render json: {message: "Failed to delete #{user.full_name} user account, plesase ensure you are an admin to perform this action"}, status: :unprocessable_entity
       end
  end


  private

    # Use callbacks to share common setup or constraints between actions.
    def find_user
      @user = User.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def create_user_params
      params.permit(:full_name, :email, :password, :clinic_location, :credentials, :role, :insurance_network, :direct_access)
    end

    def user_editable_params 
      params.permit( :password, :email, :role, :credentials, :clinic_location, :insurance_network, :direct_access, :admin)
    end

    def patient_template_params
      params.permit(:px_temp_title, :px_temp_subject, :px_temp_content, :category, :language)
    end

    def dr_template_params
      params.permit(:dr_temp_title, :dr_temp_subject, :dr_temp_content, :category)
    end

end
