class MedifilesController < ApplicationController
  before_action :set_medifile, only: %i[ show update destroy ]

  # GET /medifiles
  def index
    @medifiles = Medifile.all

    render json: @medifiles
  end

  # GET /medifiles/1
  def show
    render json: @medifile
  end

  # POST /medifiles
  def create
    @medifile = Medifile.new(medifile_params)

    if @medifile.save
      render json: @medifile, status: :created, location: @medifile
    else
      render json: @medifile.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /medifiles/1
  def update
    if @medifile.update(medifile_params)
      render json: @medifile
    else
      render json: @medifile.errors, status: :unprocessable_entity
    end
  end

  # DELETE /medifiles/1
  def destroy
    @medifile.destroy!
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_medifile
      @medifile = Medifile.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def medifile_params
      params.fetch(:medifile, {})
    end
end
