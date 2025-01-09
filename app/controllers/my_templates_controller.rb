class MyTemplatesController < ApplicationController
  before_action :set_my_template, only: %i[ show update destroy ]
  skip_before_action :is_admin?

  # GET /my_templates
  def index
    @my_templates = MyTemplate.all
    render json: @my_templates, each_serializer: MyTemplateSerializer, status: :ok
  end

  # GET /my_templates/1
  def show
    render json: @my_template, serializer: MyTemplateSerializer, status: :ok
  end

  # POST /my_templates
  def create
    @my_template = MyTemplate.new(my_template_params)
    if @my_template.save
      render json: {my_template: @my_template, messages: "template created successfully"}, status: :created, location: @my_template
    else
      render json: {my_template: @my_template.errors.full_messages, messages: "template was unable to be created, double check parameters have been met"}, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /my_templates/1
  def update
    if @my_template.update(my_template_params)
      render json: {my_template: @my_template, messages: "template was updated successfully"}, status: :ok
    else
      render json: {my_template: @my_template.errors.full_messages, messages: "template was unable to be updated, check if all parameters was met"}, status: :unprocessable_entity
    end
  end

  # DELETE /my_templates/1
  def destroy
    if @my_template.destroy
      render json: {messages: "template #{@my_templates.id}  was successfully deleted"}, status: :ok
    else 
      render json: {messages: "template unable to be deleted", my_template: @my_template.errors.full_messages}, status: :unprocessable_entity
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_my_template
      @my_template = MyTemplate.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def my_template_params
      params.permit(:user_id, :patient_template_id, :dr_template_id)
    end
end
