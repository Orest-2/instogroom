Rails.application.routes.draw do
  get 'profile', to:"profile#index"
  get 'profile/get', to:"profile#get"
  put 'profile/update', to:"profile#update"
  root 'waterfall#index'
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
