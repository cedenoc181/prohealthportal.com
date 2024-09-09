class PatientTemplatesController < ApplicationController
  before_action :set_patient_template, only: %i[ show update destroy ]

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
      render json: @patient_template, status: :created, location: @patient_template
    else
      render json: @patient_template.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /patient_templates/1
  def update
    if @patient_template.update(patient_template_params)
      render json: @patient_template
    else
      render json: @patient_template.errors, status: :unprocessable_entity
    end
  end

  # DELETE /patient_templates/1
  def destroy
    @patient_template.destroy!
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_patient_template
      @patient_template = PatientTemplate.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def patient_template_params
      params.fetch(:patient_template, {})
    end
end
