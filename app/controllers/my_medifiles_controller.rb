class MyMedifilesController < ApplicationController
  before_action :set_my_medifile, only: %i[ show update destroy ]
  skip_before_action :is_admin?

  # GET /my_medifiles
  def index
    @my_medifiles = MyMedifile.all
    render json: @my_medifiles, each_serializer: MyMedifileSerializer, status: :ok
  end

  # GET /my_medifiles/1
  def show
    render json: @my_medifile, serializer: MyMedifileSerializer, status: :ok
  end

  # POST /my_medifiles
  def create
    @my_medifile = MyMedifile.new(my_medifile_params)
    if @my_medifile.save
      render json: {my_medifile: @my_medifile, message: "your file has been created"}, status: :created, location: @my_medifile
    else
      render json: {message: "file unable to be created, double check parameters have been met", errors: @my_medifile.errors.full_messages}, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /my_medifiles/1
  def update
    if current_user.role == "Admin"
      @my_medifile.update(my_medifile_params)
      render json: {my_medifile: @my_medifile, message: 'file updated suuccessfully'}, status: :ok
    elsif current_user.role != "Admin"
        if @my_medifile.user_id == current_user.id
          @my_medifile.update(my_medifile_params)
          render json: {my_medifile: @my_medifile, message: 'file updated suuccessfully'}, status: :ok
        else 
          render json: {message: "must be a admin to update another users medifile template"}, status: :unprocessable_entity
        end
    else
      render json:  {messages: "failed to update file", errors: @my_medifile.errors.full_messages}, status: :unprocessable_entity
    end
  end

  # DELETE /my_medifiles/1
  def destroy
    if current_user.role == "Admin"
      @my_medifile.destroy
      render json: {my_medifile: @my_medifile, message: 'file deleted successfully'}, status: :ok
    elsif current_user.role != "Admin"
        if @my_medifile.user_id == current_user.id
          @my_medifile.destroy
          render json: { message: 'you successfully deleted your medifile template'}, status: :ok
        else 
          render json: {message: "must be a admin to delete another users medifile template"}, status: :unprocessable_entity
        end
    else
      render json:  {messages: "failed to delete file", errors: @my_medifile.errors.full_messages}, status: :unprocessable_entity
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_my_medifile
      @my_medifile = MyMedifile.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def my_medifile_params
      params.permit(:user_id, :coworker_id, :medifile_id, :my_file_title, :my_file_description)
    end
end
