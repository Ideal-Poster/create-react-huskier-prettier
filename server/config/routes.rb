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
  post "/friend", to: "users#invite_friend"
  delete "/friend", to:  "users#delete_friend"
  post "/friend/confirm", to: "users#confirm_friend"


  get "/auto_login", to: "auth#auto_login"
  get "/friends/locations", to: "locations#friends"
  get "/dashboard", to: "users#dashboard"

end
