class TasksController < ApplicationController
  before_action :set_task, only: %i[ show update destroy ]
  skip_before_action :is_admin?, only: %i[ index show ]
  
  # GET /tasks
  def index
    @tasks = Task.all
    render json: @tasks, each_serializer: TaskSerializer, status: :ok
  end

  # GET /tasks/1
  def show
    render json: @task, serializer: TaskSerializer, status: :ok
  end

  def manage_all_tables
    tasks = Task.include(:clinic)
    task_by_clinics = tasks.group_by(&:clinic_id)
    render json: task_by_clinics, each_searializer: TaskSerializer, status: :ok
  end

  # POST /tasks
  def create
    @task = Task.new(task_params)

    if @task.save
      render json: {task: TaskSerializer.new(@task), message: "#{current_user.first_name} created a new table: #{@task.task_table_title}"}, status: :created, location: @task
    else
      render json: {error: @task.errors.full_messages, message: "Failed to create new task table. Check params"}, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /tasks/1
  def update
    if @task.update(task_params)
      render json: {task: @task, message: "#{@task.task_table_title} has been successfully updated"}
    else
      render json:{task: @task.errors.full_messages, message: "failed to update #{@task.task_table_title}"}, status: :unprocessable_entity
    end
  end

  # DELETE /tasks/1
  def destroy
    @task.destroy!
    render json: { message: "#{@task.task_table_title} has been deleted"}
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_task
      @task = Task.find(params[:id])
      if @task.nil?
          render json: { message: "item not found", error: @task.errors.full_messages}, status: :not_found
      end
    end

    # Only allow a list of trusted parameters through.
    def task_params
      params.permit(:task_table_title, :clinic_id, :column_names {})
    end
end
