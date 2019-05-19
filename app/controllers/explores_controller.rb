class ExploresController < ApplicationController
	include InstopicsHelper
	include ProfileHelper
	before_action :authenticate_user!

  def index
	end

	def get_all_profiles
		users = User.where.not(id: current_user.id)
		res = []
		users.each do |user|
			res << get_user_data(user.id)
		end

		render json: res
	end
	
	def follow
		id = params[:followed_id]
		if current_user.follows.find_by(followed_id: id).nil?
			current_user.follows.create(followed_id: id)
		end
		render json: current_user.follows
	end

	def unfollow
		followed = current_user.follows.find_by(followed_id: id).nil?
		if !followed.nil?
			followed.destroy
		end
		render json: current_user.follows
	end
end
