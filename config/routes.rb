Rails.application.routes.draw do
  devise_for :admins
  devise_for :teachers
  resources :partners
  root to: "partners#index"
end
