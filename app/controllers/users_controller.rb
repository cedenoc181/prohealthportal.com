class UsersController < ApplicationController
  
  include Rails.application.routes.url_helpers

  # Callbacks to set user before show and destroy action method
  before_action :find_user, only: %i[ show destroy]
  # remove index show create from admin restrictions
  skip_before_action :is_admin?, except: %i[ destroy create ]
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
      render json: {user: UserSerializer.new(@user), message: "#{@user.first_name} successfully created by : #{current_user.first_name}", token: token}, status: :created
    else
      render json: { message: "Invalid user sign-up.", errors: @user.errors.full_messages }, status: :unprocessable_entity
        end
  end

  def user_create_patient_template
    new_patient_temp = current_user.patient_templates.new(patient_template_params)
    if new_patient_temp.save
     render json: {response: new_patient_temp,  message: "#{current_user.first_name} successfully created patient template: #{new_patient_temp.px_temp_title}"}, status: :created
    else
      render json: { message: new_patient_temp.errors.full_messages}, status: :unprocessable_entity
    end
  end

  def user_create_dr_template
    new_dr_temp = current_user.dr_templates.new(dr_template_params)
    if new_dr_temp.save
      render json: {response: new_dr_temp,  message: "#{current_user.first_name} successfully created dcotor template: #{new_dr_temp.dr_temp_title}"}, status: :created
    else
      render json: { message: new_dr_temp.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def user_create_medifile_template
    Rails.logger.info "Creating Medifile with params from current_user_account: #{medifile_template_params}"

    @medifile = current_user.medifiles.new(medifile_template_params)
  
    # Attach files if they are provided
    @medifile.file_cover.attach(params[:file_cover]) if params[:file_cover]
    @medifile.file_link.attach(params[:file_link]) if params[:file_link]

    p "#{@medifile.file_cover} and #{@medifile.file_link} has been attached"

    if @medifile.save
      medifile_with_urls = {
        id: @medifile.id,
        title: @medifile.title,
        description: @medifile.description,
        instructions: @medifile.instructions,
        language: @medifile.language,
        file_owner_id: @medifile.file_owner_id,
        file_receiver_id: @medifile.file_receiver_id,
        file_cover_alt: @medifile.file_cover_alt,
        created_at: @medifile.created_at,
        file_link_url: @medifile.file_link.attached? ? url_for(@medifile.file_link) : nil,
        file_cover_url: @medifile.file_cover.attached? ? url_for(@medifile.file_cover) : nil
      }
    
      render json: medifile_with_urls, status: :created
        Rails.logger.info "Medifile created successfully"
    else
       Rails.logger.error "Error creating Medifile: #{@medifile.errors.full_messages}"
      render json: { medifile: @medifile.errors.full_messages, message: "Medical file failed to create, double check all inputs" }, status: :unprocessable_entity
    end
  end

 # PATCH/PUT /users/:id
# cant update user without being logged in(authorized)
def update
    if current_user.admin?
      @user = User.find(params[:id])
      if @user && @user.update(user_editable_params)
        render json: { 
        user: UserSerializer.new(@user), 
        message: "User attributes have been successfully updated: #{@user.first_name} account by: #{current_user.first_name}"
        }, status: :ok
      else
         render json: { 
         message: "Failed to find and update user attributes", 
         errors: @user.errors.full_messages 
         }, status: :unprocessable_entity
      end

    else
      render json: {
        message: "Only admins can update other users attributes", 
        errors: current_user.errors.full_messages
      }, status: :unauthorized
    end
end


  def update_non_admin_user 
    if !current_user.admin?
      @non_admin_user = current_user
      if @non_admin_user && @non_admin_user.update(user_editable_params)
      render json: { 
        user: UserSerializer.new(@non_admin_user), 
        message: "User attributes have been successfully updated: #{@non_admin_user.first_name} account by: #{current_user.first_name}"
        }, status: :ok
      else
         render json: { 
         message: "Failed to find and update user attributes", 
         errors: @non_admin_user.errors.full_messages 
         }, status: :unprocessable_entity
      end
     else
      render json: {
      message: "This method only updates non admin accounts",
      }, status: :unauthorized
    end
  end



  # DELETE method only for Admin /users/1
  # cant destroy user without being logged in(authorized) and being a admin(is_admin?)
  def destroy
       if @user.destroy!
       render json: {message: "#{@user.first_name} user account has been successfully deleted"}, status: :ok
       else 
        render json: {message: "Failed to delete #{@user.first_name} user account, plesase ensure you are an admin to perform this action"}, status: :unprocessable_entity
       end
  end


  private

    # Use callbacks to share common setup or constraints between actions.
    def find_user
      @user = User.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def create_user_params
      params.permit(:first_name, :last_name, :email, :password, :clinic_id, :clinic_location, :credentials, :phone_ext, :admin, :role, :insurance_network, :direct_access)
    end

    def user_editable_params 
        params.permit(:password, :email, :role, :credentials, :clinic_location, :insurance_network, :direct_access, :phone_ext, :first_name, :last_name, :clinic_id)               
    end

    def patient_template_params
      params.permit(:px_temp_title, :px_temp_subject, :px_temp_content, :px_owner_id, :category, :language)
    end

    def dr_template_params
      params.permit(:dr_temp_title, :dr_temp_subject, :dr_temp_content, :dr_owner_id, :category)
    end

    def medifile_template_params 
      params.permit(:title, :description, :instructions, :language, :file_owner_id, :file_receiver_id, :file_cover_alt, :file_cover, :file_link)
    end

end
