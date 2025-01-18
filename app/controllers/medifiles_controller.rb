class MedifilesController < ApplicationController

  include Rails.application.routes.url_helpers

  before_action :set_medifile, only: %i[ show update destroy ]
  skip_before_action :is_admin?, only: [:index, :show, :create, :destroy] #this line might change depending on UI functionality


# GET /medifiles
def index
  @medifiles = Medifile.all

  medifiles_with_urls = @medifiles.map do |medifile|
    {
      id: medifile.id,
      title: medifile.title,
      description: medifile.description,
      instructions: medifile.instructions,
      language: medifile.language,
      file_owner_id: medifile.file_owner_id,
      file_receiver_id: medifile.file_receiver_id,
      file_cover_alt: medifile.file_cover_alt,
      created_at: medifile.created_at,
      file_link_url: medifile.file_link.attached? ? url_for(medifile.file_link) : nil,
      file_cover_url: medifile.file_cover.attached? ? url_for(medifile.file_cover) : nil
    }
  end

  render json: medifiles_with_urls, status: :ok
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
    if current_user.role == "Admin"
      @medifile.destroy
    render json: {file: "#{@medifile} file has been deleted"}, status: :ok  
  elsif current_user.role != "Admin"
    if @medifile.file_owner_id == current_user.id
      @medifile.destroy
      render json: { message: 'you successfully deleted your medifile template'}, status: :ok
  else
       render json: {medifile: @medifile.errors.full_messages, error: "medical file failed be deleted"}, status: :unprocessable_entity
     end
   end
  end

    private
 # Use callbacks to share common setup or constraints between actions.
      def set_medifile
        @medifile = Medifile.find(params[:id])
      end

      # Only allow a list of trusted parameters through.
      def medifile_params
        params.permit(:title, :description, :instructions, :language, :file_owner_id, :file_receiver_id, :file_cover_alt, :file_cover, :file_link)
      end

end
