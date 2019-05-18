Rails.application.routes.draw do
  get 'profile', 						to: "profile#index"
  get 'profile/:id', 				to: "profile#get_other"
  get 'profile/get', 				to: "profile#get"
	put 'profile/update', 		to: "profile#update"
	
	get 'instopic/like/:id', 		to: 'instopics#like'
	get 'instopic/dislike/:id', to: 'instopics#dislike'
	post 'instopic/create', 		to: 'instopics#create'
	delete 'instopic/delete', 	to: 'instopics#delete'

  root 'waterfall#index'
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
