class MedifilesController < ApplicationController
  before_action :set_medifile, only: %i[ show update destroy ]
  skip_before_action :authorized, only: [:index, :show]

  # GET /medifiles
  def index
    medifiles = Medifile.all
    render json: medifiles, status: :ok
  end

  # GET /medifiles/1
  def show
    render json: @medifile
  end

  # POST /medifiles
  def create
    unless is_admin?
      return render json: { errors: "User is not authorized to create medical file" }, status: :forbidden
    end
    @medifile = Medifile.new(medifile_params)
    if @medifile.save
      render json: @medifile, status: :created, location: @medifile
    else
      render json: @medifile.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /medifiles/1
  def update
    unless is_admin?
      return render json: { errors: "User is not authorized to update template" }, status: :forbidden
    end
    if @medifile.update(medifile_params)
      render json: @medifile
    else 
      render json: @medifile.errors, status: :unprocessable_entity
    end
  end

  # DELETE /medifiles/1
   def destroy
     unless is_admin?
       return render json: { errors: "User is not authorized to delete medical file" }, status: :forbidden
     end
     if @medifile.destroy
       render json: { message: "medical file destroyed successfully" }, status: :no_content   
     else
       render json: {error: "medical file not found"}
     end
   end
  

    private
 # Use callbacks to share common setup or constraints between actions.
      def set_medifile
        @medifile = Medifile.find(params[:id])
      end

      # Only allow a list of trusted parameters through.
      def medifile_params
        params.permit(:title, :description, :instructions, :language, :file_editable, :file_cover, :file_cover_alt, :file_link)
      end
end
