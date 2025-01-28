class DrTemplatesController < ApplicationController
  before_action :set_dr_template, only: %i[ show update destroy ]
  skip_before_action :is_admin?
  
  # GET /dr_templates
  def index
    @dr_templates = DrTemplate.all
    render json: @dr_templates, each_serializer: DrTemplateSerializer, status: :ok
  end

  # GET /dr_templates/1
  def show
    render json: @dr_template, serializer: DrTemplateSerializer, status: :ok
  end

  # PATCH/PUT /dr_templates/1
  def update
      if current_user.admin? || current_user.id == @dr_template.dr_owner_id
        if @dr_template.update(dr_template_params)
          render json: {doctor_template: @dr_template, message: "#{current_user.first_name} successfully updated #{@dr_template.dr_temp_title}"}, status: :ok
        else
         render json: { message: "Unable to update template", errors: @dr_template.errors.full_messages }, status: :unprocessable_entity 
        end
      else
        render json: { message: "Template can only be modified by admin and publisher" }, status: :unprocessable_entity
      end
  end


  # DELETE /dr_templates/1
  def destroy
  if current_user.admin? || current_user.id == @dr_template.dr_owner_id
    relational = MyTemplate.find_by(dr_template_id: @dr_template.id)

    if relational
      relational.destroy
      @dr_template.destroy
      render json: { message: " #{@dr_template.dr_temp_title} template has been deleted by #{current_user.first_name}" }, status: :ok
    else
      render json: { message: "Failed to delete, template not found" }, status: :unprocessable_entity
    end
  else
    render json: { message: "Only admins and publishers are authorized to perform this action"}
   end 
  end
  

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_dr_template
      @dr_template = DrTemplate.find(params[:id])
    rescue ActiveRecord::RecordNotFound
      render json: {message: 'Dr Template not found in database'}, status: :not_found
    end

    # Only allow a list of trusted parameters through.
    def dr_template_params
      params.permit(:dr_temp_title, :dr_temp_subject, :dr_temp_content, :dr_owner_id, :category)
    end
end
