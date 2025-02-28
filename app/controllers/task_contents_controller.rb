class TaskContentsController < ApplicationController
  before_action :set_task_content, only: %i[ show update destroy ]

  # GET /task_contents
  def index
    @task_contents = TaskContent.all

    render json: @task_contents
  end

  # GET /task_contents/1
  def show
    render json: @task_content
  end

  # POST /task_contents
  def create
    @task_content = TaskContent.new(task_content_params)

    if @task_content.save
      render json: @task_content, status: :created, location: @task_content
    else
      render json: @task_content.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /task_contents/1
  def update
    if @task_content.update(task_content_params)
      render json: @task_content
    else
      render json: @task_content.errors, status: :unprocessable_entity
    end
  end

  # DELETE /task_contents/1
  def destroy
    @task_content.destroy!
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_task_content
      @task_content = TaskContent.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def task_content_params
      params.fetch(:task_content, {})
    end
end
