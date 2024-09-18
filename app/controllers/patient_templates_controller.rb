class PatientTemplatesController < ApplicationController
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
    unless is_admin?
      return render json: { errors: "User is not authorized to create template" }, status: :forbidden
    end
    @patient_template = PatientTemplate.new(patient_template_params)
    if @patient_template.save
      render json: @patient_template, status: :created, location: @patient_template
     else
      render json: @patient_template.errors, status: :unprocessable_entity
     end
  end

  # PATCH/PUT /patient_templates/1
  def update
    unless is_admin?
      return render json: { errors: "User is not authorized to update template" }, status: :forbidden
    end
    if @patient_template.update(patient_template_params)
      render json: @patient_template
    else
      render json: @patient_template.errors, status: :unprocessable_entity
    end
  end

  # DELETE /patient_templates/1
  def destroy
    unless is_admin?
      return render json: { errors: "User is not authorized to delete template" }, status: :forbidden
    end
    if @patient_template.destroy
    render json: { message: "template destroyed successfully" }, status: :no_content   
    else
      render json: {error: "template not found"}
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_patient_template
      @patient_template = PatientTemplate.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def patient_template_params
      params.permit(:px_temp_title, :px_temp_content, :category, :language )
    end
end
