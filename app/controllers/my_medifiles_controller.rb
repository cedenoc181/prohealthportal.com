class MyMedifilesController < ApplicationController
  before_action :set_my_medifile, only: %i[ show update destroy ]

  # GET /my_medifiles
  def index
    @my_medifiles = MyMedifile.all

    render json: @my_medifiles
  end

  # GET /my_medifiles/1
  def show
    render json: @my_medifile
  end

  # POST /my_medifiles
  def create
    @my_medifile = MyMedifile.new(my_medifile_params)

    if @my_medifile.save
      render json: @my_medifile, status: :created, location: @my_medifile
    else
      render json: @my_medifile.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /my_medifiles/1
  def update
    if @my_medifile.update(my_medifile_params)
      render json: @my_medifile
    else
      render json: @my_medifile.errors, status: :unprocessable_entity
    end
  end

  # DELETE /my_medifiles/1
  def destroy
    @my_medifile.destroy!
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_my_medifile
      @my_medifile = MyMedifile.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def my_medifile_params
      params.fetch(:my_medifile, {})
    end
end
