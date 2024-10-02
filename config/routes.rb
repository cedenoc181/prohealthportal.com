Rails.application.routes.draw do

    #user path to full crud of these models for nested routes
  #these models are specifically for users for personalized exp for nom-admins
  resources :users 
  resources :my_templates
    # might nest dr and patient template to give user(Admin) crud capability
  resources :my_medifiles
  

      #user controller custom actions 
    get "/my-account", to: "users#me"

    post 'auth/login', to: 'session#login'
    # Password reset routes
    post 'password/forgot', to: 'password#forgot'
    post 'password/reset', to: 'password#reset'

  #admin accoubt will be able to do full crud of these templates and files 
  # resources :my_templates, only: [:index, :show, :delete]
  # resources :my_medifiles, only: [:index, :show, :delete]

    #admin will be only user to create instances of these models, 
  resources :dr_templates
  resources :patient_templates
  resources :medifiles

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "/up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"

    # route to test your configuration











end
