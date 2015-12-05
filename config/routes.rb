Rails.application.routes.draw do
  devise_for :admins, skip: [:sessions, :registrations, :passwords]
  devise_for :teachers, skip: [:sessions, :registrations, :passwords]

  devise_scope :teacher do
    post '/sign_up' => 'registrations#create'
    post '/sign_in' => 'sessions#create', :as => :create_session
    delete '/sign_out' => 'sessions#destroy', :as => :destroy_session
  end

  resources :questions, only: [:update]

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

  resources :programs, only: [:index]

  resources :classrooms do
    member do
      post 'upload'
    end
    resources :forms do
      collection do
        get ':category', to: 'forms#display', as: 'display'
      end
    end
  end

  resources :students, only: [:create]

  root to: 'pages#home'

  get '/states', to: 'pages#states'
end
