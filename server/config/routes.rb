Rails.application.routes.draw do
  resources :visits
  resources :language_locations
  resources :user_languages
  resources :locations
  resources :languages
  resources :users, except: :create
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  post "/signup", to: "users#create"
  post "/login", to: "auth#login"

  get "/auto_login", to: "auth#auto_login"
  get "/friends/locations", to: "locations#friends"


end
