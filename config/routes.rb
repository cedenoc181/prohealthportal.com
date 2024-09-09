Rails.application.routes.draw do
  resources :my_templates
  resources :dr_templates
  resources :patient_templates
  resources :my_medifiles
  resources :medifiles
  resources :users
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"

    # route to test your configuration
  get '/hello', to: 'application#hello_world'
  
  get '/yer', to: "application#yer"
end
