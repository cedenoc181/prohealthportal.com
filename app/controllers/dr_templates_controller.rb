class DrTemplatesController < ApplicationController
  before_action :check_admin, only:%i[create, update, destroy]
  before_action :set_dr_template, only: %i[ show update destroy ]
  skip_before_action :authorized, only: %i[index show]
  
  # GET /dr_templates
  def index
    @dr_templates = DrTemplate.all

    render json: @dr_templates
  end

  # GET /dr_templates/1
  def show
    render json: @dr_template
  end

  # POST /dr_templates
  def create
    @dr_template = DrTemplate.new(dr_template_params)

    if @dr_template.save
      render json: {dr_template: @dr_template, message: "Template successfully created"}, status: :created, location: @dr_template
     else
      render json: {message: "Unable to create template", errors: @dr_template.errors}, status: :unprocessable_entity
     end
  end

  # PATCH/PUT /dr_templates/1
  def update
    if @dr_template.update(dr_template_params)
      render json: {dr_template: @dr_template, message: "Template successfully updated"}, status: :ok
    else
     render json: {message: "Unable to update template", errors: @dr_template.errors}, status: :unprocessable_entity 
    end
  end

  # DELETE /dr_templates/1
  def destroy
    if @dr_template.destroy
      render json: {message: 'Template was successfully deleted'}, status: :no_content
    else 
      render json: {message: 'Template failed to be deleted', errors: @dr_template.errors}, status: :unprocessable_entity
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_dr_template
      @dr_template = DrTemplate.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def dr_template_params
      params.fetch(:dr_template, {})
    end
end
