class MedifilesController < ApplicationController
  before_action :set_medifile, only: %i[ show update destroy ]
  skip_before_action :is_admin?, only: [:index, :show, :create] #this line might change depending on UI functionality


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
    Rails.logger.info "Creating Medifile with params: #{medifile_params}"

    @medifile = Medifile.new(medifile_params)
  
    # Attach files if they are provided
    @medifile.file_cover.attach(params[:file_cover]) if params[:file_cover]
    @medifile.file_link.attach(params[:file_link]) if params[:file_link]

    p "#{@medifile.file_cover} and #{@medifile.file_link} has been attached"

    if @medifile.save
      render json: @medifile, status: :created, location: @medifile
        Rails.logger.info "Medifile created successfully"
    else
       Rails.logger.error "Error creating Medifile: #{@medifile.errors.full_messages}"
      render json: { medifile: @medifile.errors.full_messages, message: "Medical file failed to create, double check all inputs" }, status: :unprocessable_entity
    end
  end
  

  # PATCH/PUT /medifiles/1
  def update
    if @medifile.update(medifile_params)
      render json:  @medifile, status: :ok
    else 
      render json: {medifile: @medifile.errors.full_messages, message: "medical file failed to update, double check inputs."}, status: :unprocessable_entity
    end
  end

  # DELETE /medifiles/1
   def destroy
     if @medifile.destroy
    render json: {file: "#{@medifile.title} file has been deleted"}, status: :ok  
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
        params.permit(:title, :description, :instructions, :language, :file_editable, :file_cover_alt)
      end

end
