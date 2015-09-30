Rails.application.routes.draw do
  devise_for :admins
  resources :partners

  root to: "partners#index"
end
