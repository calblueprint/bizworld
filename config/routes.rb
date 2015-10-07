Rails.application.routes.draw do
  devise_for :admins, controllers: { sessions: 'sessions' }
  devise_for :teachers, controllers: { sessions: 'sessions' }

  devise_scope :teacher do
    get 'teachers/sign_in' => 'sessions#new', :as => :new_session
    post 'teachers/sign_in' => 'sessions#create', :as => :create_session
    get 'teachers/sign_out' => 'sessions#destroy', :as => :destroy_session
  end

  resources :partners
  resources :teachers
  resources :admins do
    collection do
      get 'classrooms'
    end
  end

  root to: "partners#index"
end
