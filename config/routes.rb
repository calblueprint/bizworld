Rails.application.routes.draw do
  root to: 'pages#home'

  devise_for :admins, skip: [:sessions, :registrations, :passwords]
  devise_for :teachers, skip: [:sessions, :registrations, :passwords]

  devise_scope :teacher do
    post '/sign_up' => 'registrations#create'
    post '/sign_in' => 'sessions#create', :as => :create_session
    delete '/sign_out' => 'sessions#destroy', :as => :destroy_session
    get '/password_update' => 'registrations#password_update', :as => :password_update
  end

  resources :forms, only: [:show] do
    get 'finished', to: 'forms#finished'
  end

  get 'admins/classrooms', to: 'admins#classrooms'
  get 'classrooms/edit_questions', to: 'classrooms#edit_questions'

  resources :teachers, only: [:show] do
    get 'classrooms', to: 'teachers#classrooms'
  end

  resources :classrooms, only: [:show] do
    get 'forms/:category', to: 'forms#display', as: 'display'
  end

  namespace :api do
    get '/states', to: 'pages#states'
    get '/admins/classrooms', to: 'admins#classrooms'
    get '/admins/download/classrooms', to: 'admins#download_classrooms'
    get '/admins/download/teachers', to: 'admins#download_teachers'
    get '/classrooms/additional_questions', to: 'classrooms#additional_questions'

    post '/forms/submit', to: 'forms#submit'

    resources :classroom_additional_questions, only: [:create, :update, :destroy]
    resources :passwords, only: [:update]
    resources :questions, only: [:update, :create, :destroy]
    resources :students, only: [:create, :destroy]
    resources :programs, only: [:index]

    resources :teachers, only: [:show, :update] do
      get 'classrooms', to: 'teachers#classrooms'
    end

    resources :classrooms, only: [:create, :show, :update, :destroy] do
      get 'download', to: 'classrooms#download'
      post 'upload', to: 'classrooms#upload'
    end

    resources :forms, only: [:show] do
      post 'submit', to: 'forms#submit'
    end
  end
end
