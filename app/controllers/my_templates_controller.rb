class MyTemplatesController < ApplicationController
  before_action :authorized
  before_action :set_my_template, only: %i[ show update destroy ]

  # GET /my_templates
  def index
    @my_templates = MyTemplate.all

    render json: @my_templates
  end

  # GET /my_templates/1
  def show
    render json: @my_template
  end

  # POST /my_templates
  def create
    @my_template = MyTemplate.new(my_template_params)

    if @my_template.save
      render json: @my_template, status: :created, location: @my_template
    else
      render json: @my_template.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /my_templates/1
  def update
    if @my_template.update(my_template_params)
      render json: @my_template
    else
      render json: @my_template.errors, status: :unprocessable_entity
    end
  end

  # DELETE /my_templates/1
  def destroy
    @my_template.destroy!
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_my_template
      @my_template = MyTemplate.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def my_template_params
      params.permit(:user_id, :notes)
    end
end
