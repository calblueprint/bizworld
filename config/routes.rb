Rails.application.routes.draw do
  resources :partners

  root to: "partners#index"
end
