class PatientTemplatesController < ApplicationController
  before_action :set_patient_template, only: %i[ show update destroy ]
  skip_before_action :is_admin?


  # GET /patient_templates
  def index
    @patient_templates = PatientTemplate.all
     render json: @patient_templates, each_serializer: PatientTemplateSerializer, status: :ok
  end

  # GET /patient_templates/1
  def show
    render json: @patient_template, serializer: PatientTemplateSerializer, status: :ok
  end


  def update
    if current_user.admin? || current_user.id == @patient_template.px_owner_id
      if @patient_template.update(patient_template_params)
        render json:{  patient_template: @patient_template, message: "#{current_user.first_name} updated template successfully"}, status: :ok
      else
        render json: { message: "Template failed to update", errors: @patient_template.errors.full_messages }, status: :unprocessable_entity
      end
    else
      render json: { message: "Template can only be modified by admins and publishers" }, status: :unprocessable_entity
    end
  end


  # DELETE /patient_templates/1
  def destroy
    if current_user.admin? || current_user.id == @patient_template.px_owner_id
      relational = MyTemplate.find_by(patient_template_id: @patient_template.id)
  
      if relational
        relational.destroy
        @patient_template.destroy
        render json: { message: "#{@patient_template.px_temp_title} has been deleted by #{current_user.first_name}" }, status: :ok
      else
        render json: { message: "Failed to delete, template not found" }, status: :unprocessable_entity
      end
    else
      render json: { message: "Template can only be deleted by admins and publishers" }, status: :unprocessable_entity
    end
  end
  

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_patient_template
      @patient_template = PatientTemplate.find(params[:id])
    rescue ActiveRecord::RecordNotFound
      render json: { message: "Patient template not found in database" }, status: :not_found
    end 

    # Only allow a list of trusted parameters through.
    def patient_template_params
      params.permit(:px_temp_title, :px_temp_subject, :px_temp_content, :px_owner_id, :category, :language )
    end
end
