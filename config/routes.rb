Rails.application.routes.draw do
  devise_for :admins, skip: [:sessions, :registrations, :passwords]
  devise_for :teachers, skip: [:sessions, :registrations, :passwords]

  devise_scope :teacher do
    post '/sign_in' => 'sessions#create', :as => :create_session
    get '/sign_out' => 'sessions#destroy', :as => :destroy_session
  end

  resources :partners
  resources :teachers do
    member do
      get 'classrooms'
    end
  end

  resources :admins do
    collection do
      get 'classrooms'
    end
  end

  root to: 'pages#home'
end
