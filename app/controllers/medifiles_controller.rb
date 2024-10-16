class MedifilesController < ApplicationController
  before_action :set_medifile, only: %i[ show update destroy ]
  skip_before_action :is_admin?, only: [:index, :show] #this line might change depending on UI functionality


  # GET /medifiles
  def index
    @medifiles = Medifile.all
    render json: @medifiles, each_serializer: MedifileSerializer, status: :ok
  end

  # GET /medifiles/1
  def show
    render json: @medifile, serializer: MedifileSerializer, status: :ok
  end

  # POST /medifiles
  def create
    @medifile = Medifile.new(medifile_params)
    if @medifile.save
      render json: {medifile: @medifile, message: "your file has been successfully created"}, status: :created, location: @medifile
    else
      render json: {medifile: @medifile.errors.full_messages, message: "medical file failed to create, double check all inputs"}, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /medifiles/1
  def update
    if @medifile.update(medifile_params)
      render json: {medifile: @medifile, message: "Medifile was updated successfully"}, status: :ok
    else 
      render json: {medifile: @medifile.errors.full_messages, message: "medical file failed to update, double check inputs."}, status: :unprocessable_entity
    end
  end

  # DELETE /medifiles/1
   def destroy
     if @medifile.destroy
       render json: { message: "medical file destroyed successfully" }, status: :no_content   
     else
       render json: {medifile: @medifile.errors.full_messages, error: "medical file failed be deleted"}, status: :unprocessable_entity
     end
   end
  

    private
 # Use callbacks to share common setup or constraints between actions.
      def set_medifile
        @medifile = Medifile.find(params[:id])
      end

      # Only allow a list of trusted parameters through.
      def medifile_params
        params.permit(:title, :description, :instructions, :language, :file_editable, :file_cover_alt, :file_cover, :file_link)
      end

end
