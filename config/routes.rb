Rails.application.routes.draw do
  devise_for :admins, skip: [:sessions, :registrations, :passwords]
  devise_for :teachers, skip: [:sessions, :registrations, :passwords]

  devise_scope :teacher do
    post '/sign_up' => 'registrations#create'
    post '/sign_in' => 'sessions#create', :as => :create_session
    get '/sign_out' => 'sessions#destroy', :as => :destroy_session
  end

  resources :partners
  resources :forms, only: [:show] do
    post 'submit'
  end

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

  resources :classrooms do
    member do
      post 'upload'
    end
    resources :forms do
      collection do
        get ':category', to: 'forms#display'
      end
    end
  end

  root to: 'pages#home'

  get '/states', to: 'pages#states'
end
