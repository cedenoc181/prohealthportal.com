class PatientTemplatesController < ApplicationController
  before_action :set_patient_template, only: %i[ show update destroy ]
  skip_before_action :is_admin?, only: %i[index show create update]


  # GET /patient_templates
  def index
    @patient_templates = PatientTemplate.all
     render json: @patient_templates, each_serializer: PatientTemplateSerializer, status: :ok
  end

  # GET /patient_templates/1
  def show
    render json: @patient_template, serializer: PatientTemplateSerializer, status: :ok
  end

  # POST /patient_templates
  def create
    @patient_template = PatientTemplate.new(patient_template_params)
    if @patient_template.save
      render json: { patient_template: @patient_template, message: "Template successfully created" }, status: :created, location: @patient_template
     else
      render json: { message: "Unable to create template, double check parameters have been met", errors: @patient_template.errors.full_messages }, status: :unprocessable_entity
     end
  end

  def update
    if current_user.admin? 
      if @patient_template.update(patient_template_params)
        render json: @patient_template, serializer: PatientTemplateSerializer, message: "Template updated successfully", status: :ok
      else
        render json: { message: "Template failed to update", errors: @patient_template.errors.full_messages }, status: :unprocessable_entity
      end
      
    elsif !current_user.admin? 
      if @patient_template.id >= 23 && current_user.id === @patient_template.px_owner_id
       if @patient_template.update(patient_template_params)
        render json: @patient_template, serializer: PatientTemplateSerializer, message: "Template updated successfully", status: :ok
       else
        render json: { message: "Template failed to update", errors: @patient_template.errors.full_messages }, status: :unprocessable_entity
       end
    else
      render json: { message: "Template can only be modified by admins" }, status: :unprocessable_entity
    end
  end
end


  # DELETE /patient_templates/1
  def destroy
    if @patient_template.destroy
      render json: { message: "#{@patient_template.px_temp_title} template has been deleted"}, status: :ok
    else
      render json: { message: "Failed to delete, template not found" }, status: :unprocessable_entity
    end
  rescue ActiveRecord::InvalidForeignKey
    render json: { message: "Failed to delete the template. The foreign key still exists, ensure that any related records in the 'my_template' table are removed first." }, status: :unprocessable_entity
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
