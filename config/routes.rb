Rails.application.routes.draw do
  resources :task_contents
  resources :tasks
  
  resources :ordered_items
  resources :inventory_items
  resources :requested_items
  resources :clinics

    #user path to full crud of these models for nested routes
  #these models are specifically for users for personalized exp for nom-admins
  resources :users  
  resources :my_templates
    # might nest dr and patient template to give user(Admin) crud capability
  resources :my_medifiles
  

      #user account route post login
    get "/my-account", to: "users#me"
      # non admin user update route
    patch "/current_user-update", to: "users#update_non_admin_user"
    #login route
    post 'account/login', to: 'session#login'
   #logout route
    delete 'account/logout', to: 'session#logout'

    # Password reset routes
    post 'password/forgot', to: 'password#forgot'
    post 'password/reset', to: 'password#reset'

    post '/create-patient-template', to: 'users#user_create_patient_template'

    post '/create-doctor-template', to: 'users#user_create_dr_template'

    post '/create-medifiles-template', to: 'users#user_create_medifile_template'
    # api end point for email sender 

    get '/email_config', to: 'email_config#index'

      # INVENTORY ITEMS
    
    get '/inventory', to: 'inventory_items#index'

    get '/low_inv_items', to: 'inventory_items#low_inv_items'

    # get '/inventory_type', to: 'inventory_items#inventory_type'

    get '/inventory_by_clinic', to: 'inventory_items#inventory_by_clinic'

    # get '/inventory_by_requested', to: 'inventory_items#inventory_by_request_sent'


      # REQUESTED ITEMS 
    get '/requested_items_for_clinics', to: 'requested_items#requested_items_for_clinics'

    # ORDERED ITEMS 
    get '/ordered_items_grouped', to: 'ordered_items#ordered_items_grouped_by_clinic'
    
    get '/all_ordered_items_grouped_by_clinics', to: 'ordered_items#all_ordered_items_grouped_by_clinic'
    
      # get '/requested_items_ordered', to: 'requested_items#ordered_items'

        #TASK MODEL 
        get '/all_clinical_task_tables', to: 'tasks#manage_all_tables'

        # TASKCONTENT MODEL
        get "/first_five_clinical_task", to: "task_contents#tasks_preview"

    #admin will be only user to create instances of these models, 
  resources :dr_templates
  resources :patient_templates
  resources :medifiles

      # Active Storage
      direct :rails_blob do |blob|
        route_for(:rails_blob, blob)
      end
    
      direct :rails_blob_representation do |representation|
        route_for(:rails_blob_representation, representation)
      end
   
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  # get "/up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"

    # route to test your configuration











end
