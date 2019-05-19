Rails.application.routes.draw do
  get 'profile', 						to: 'profile#index'
  get 'profile/:id', 				to: 'profile#get_other'
  get 'profile/get', 				to: 'profile#get'
	put 'profile/update', 		to: 'profile#update'
	
	get 'instopic/like/:id', 		to: 'instopics#like'
	get 'instopic/dislike/:id', to: 'instopics#dislike'
	post 'instopic/create', 		to: 'instopics#create'
	delete 'instopic/delete', 	to: 'instopics#delete'

	get 'explores',	to: 'explores#index'
	get 'explores/all_profiles',	to: 'explores#get_all_profiles'
	post 'explores/follow',	to: 'explores#follow'
	post 'explores/unfollow',	to: 'explores#unfollow'

  root 'waterfall#index'
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
