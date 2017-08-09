Rails.application.routes.draw do
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: "games#index"
  resources :games, only: [:index, :show, :create, :new]

  namespace :api do
    namespace :v1 do
      resources :games, only: [:show]
    end
  end
end
