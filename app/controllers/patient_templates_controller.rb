class PatientTemplatesController < ApplicationController
  before_action :check_admin, only:%i[create, update, destroy]
  before_action :set_patient_template, only: %i[ show update destroy ]
  skip_before_action :authorized, only: %i[index show]

  # GET /patient_templates
  def index
    @patient_templates = PatientTemplate.all

    render json: @patient_templates
  end

  # GET /patient_templates/1
  def show
    render json: @patient_template
  end

  # POST /patient_templates
  def create
    @patient_template = PatientTemplate.new(patient_template_params)
    if @patient_template.save
      render json: {patient_template: @patient_template, message: "Template successfully created"}, status: :created, location: @patient_template
     else
      render json: {message: "Unable to create template", errors: @patient_template.errors}, status: :unprocessable_entity
     end
  end

  # PATCH/PUT /patient_templates/1
  def update
    if @patient_template.update(patient_template_params)
      render json: { patient_template: @patient_template, message: "Template updated successfully" }, status: :ok
    else
      render json: { mesasage: "Template failed to update", errors: @patient_template.errors }, status: :unprocessable_entity
    end
  end

  # DELETE /patient_templates/1
  def destroy
    if @patient_template.destroy
    render json: { message: "Template deleted successfully" }, status: :ok   
    else
      render json: {message: "Failed to delete template", errors: @patient_template.errors}, status: :unprocessable_entity
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_patient_template
      @patient_template = PatientTemplate.find(params[:id])
    rescue ActiveRecord::RecordNotFound
      render json: { message: "Patient template not found" }, status: :not_found
    end 

    # Only allow a list of trusted parameters through.
    def patient_template_params
      params.permit(:px_temp_title, :px_temp_content, :category, :language )
    end
end
