class TaskContentsController < ApplicationController
  before_action :set_task_content, only: %i[ show update destroy ]

  skip_before_action :is_admin? 

  # GET /task_contents
  def index
    @task_contents = TaskContent.all
      render json: @task_contents, each_serializer: TaskContentSerializer, status: :ok
  end

  # GET /task_contents/1
  def show
    render json: @task_content, serializer: TaskContentSerializer, status: :ok
  end

  # GET /first 5 tasks
  def tasks_preview
    first_five_tasks = TaskContent.includes(:task).limit(5).group_by(&:task_id)
    render json: first_five_tasks.transform_values { |task| 
      ActiveModelSerializers::SerializableResource.new(task, each_serializer: TaskContentSerializer) 
    }, status: :ok
  end

  # POST /task_contents
  def create
    @task_content = TaskContent.new(task_content_params)
    task_assoc_clinic = @task_content.task['clinic_id']
    clinic_match = current_user&.clinic_id == task_assoc_clinic
    if current_user&.admin || clinic_match
       if @task_content.save
         render json: @task_content, status: :created, location: @task_content
       else
         render json: @task_content.errors, status: :unprocessable_entity
       end
     else
      render json: {  message: "User is not authorized to perform this action on"}, status: :unauthorized    
    end  
  end

  # PATCH/PUT /task_contents/1
  def update
    task_assoc_clinic = @task_content.task['clinic_id']
    clinic_match = current_user&.clinic_id == task_assoc_clinic
    if current_user&.admin || clinic_match
       if @task_content.update(task_content_params)
         render json: {task: @task_content, message: "Successfully update task content"}, status: :ok 
       else
         render json: @task_content.errors, status: :unprocessable_entity
       end
     else
      render json: {  message: "User is not authorized to perform this action on: #{@task_content.task_data}"}, status: :unauthorized   
    end
  end

  # DELETE /task_contents/1
  def destroy
    task_assoc_clinic = @task_content.task['clinic_id']
    clinic_match = current_user&.clinic_id == task_assoc_clinic
    if current_user&.admin || clinic_match
        if @task_content.destroy
          render json: { message: "Data has been deleted: #{@task_content.task_data}."}, status: :ok
        else 
           render json: { message: "failed to delete: #{@task_content.task_data}"}, status: :unprocessable_entity
        end
      else  
        render json: {  message: "User is not authorized to perform this action on: #{@task_content.task_data}"}, status: :unauthorized
    end
end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_task_content
      @task_content = TaskContent.find(params[:id])
      if @task_content.nil?
        render json: { error: 'Task content was not found'}, status: :not_found
      end
    end

    # Only allow a list of trusted parameters through.
    def task_content_params
       params.permit(:task_id, :user_id, task_data: {})
    end
end
