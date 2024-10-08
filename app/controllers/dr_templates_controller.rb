class DrTemplatesController < ApplicationController
  before_action :set_dr_template, only: %i[ show update destroy ]
  skip_before_action :is_admin?, only: %i[index show create update]
  
  # GET /dr_templates
  def index
    @dr_templates = DrTemplate.all
    render json: @dr_templates, each_serializer: DrTemplateSerializer, status: :ok
  end

  # GET /dr_templates/1
  def show
    render json: @dr_template, serializer: DrTemplateSerializer, status: :ok
  end

  # POST /dr_templates
  def create
    @dr_template = DrTemplate.new(dr_template_params)
    if @dr_template.save
      render json: {dr_template: @dr_template, message: "Template successfully created"}, status: :created, location: @dr_template
     else
      render json: {message: "Unable to create template", errors: @dr_template.errors.full_messages}, status: :unprocessable_entity
     end
  end

  # PATCH/PUT /dr_templates/1
  def update
      if current_user.admin?
        if @dr_template.update(dr_template_params)
          render json: {dr_template: @dr_template, message: "Template successfully updated"}, status: :ok
        else
         render json: {message: "Unable to update template", errors: @dr_template.errors.full_messages}, status: :unprocessable_entity 
        end
      elsif !current_user.admin?
          if @dr_template.id >= 11
            if @dr_template.update(dr_template_params)
              render json: {drTemplate: @dr_templates, message: "Template updated successfully"}, status: :ok
            else 
              render json: {meesage: "Template was unable to be updated", errors: @dr_template.errors.full_messages}, status: :unprocessable_entity
            end
          end
      else
        render json: {message: "Template can only be modified by admin", errors: @dr_template.errors.full_messages}, status: :unprocessable_entity
      end
  end

  # DELETE /dr_templates/1
  def destroy
    if @dr_template.destroy
      render json: { message: "Dr template has been deleted"}, status: :ok
    else
      render json: { message: "Failed to delete, template not found" }, status: :unprocessable_entity
    end
  rescue ActiveRecord::InvalidForeignKey
    render json: { message: "Failed to delete the template. The foreign key still exists, ensure that any related records in the 'my_template' table are removed first." }, status: :unprocessable_entity
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
      params.permit(:dr_temp_title, :dr_temp_subject, :dr_temp_content, :category)
    end
end
