Rails.application.routes.draw do
  root to: 'pages#home'

  devise_for :admins, skip: [:sessions, :registrations, :passwords]
  devise_for :teachers, skip: [:sessions, :registrations, :passwords]

  devise_scope :teacher do
    post '/sign_up' => 'registrations#create'
    post '/sign_in' => 'sessions#create', :as => :create_session
    delete '/sign_out' => 'sessions#destroy', :as => :destroy_session
  end

  resources :forms, only: [:show]

  get 'admins/classrooms', to: 'admins#classrooms'

  resources :teachers, only: [:show] do
    get 'classrooms', to: 'teachers#classrooms'
  end

  resources :classrooms, only: [:show] do
    get 'forms/:category', to: 'forms#display', as: 'display'
  end

  namespace :api do
    get '/states', to: 'pages#states'
    get 'admins/classrooms', to: 'admins#classrooms'

    post '/forms/submit', to: 'forms#submit'

    resources :questions, only: [:update]
    resources :students, only: [:create]
    resources :programs, only: [:index]

    resources :teachers, only: [:show, :update] do
      get 'classrooms', to: 'teachers#classrooms'
    end

    resources :classrooms, only: [:create, :show, :update] do
      post 'upload', to: 'classrooms#upload'
    end

    resources :forms, only: [:show] do
      post 'submit', to: 'forms#submit'
    end
  end
end
