class ExploresController < ApplicationController
	include ProfileHelper
	before_action :authenticate_user!

  def index
	end

	def get_all_profiles
		users = User.all
		res = []
		users.each do |user|
			res << get_user_data(user.id)
		end

		render json: res
	end
	
	def follow
		id = params[:followed_id]
		if current_user.followers.find_by(followed_id: id).nil?
			current_user.followers.create(followed_id: id)
		end
		render json: current_user.followers
	end

	def unfollow
		follower = current_user.followers.find_by(followed_id: id).nil?
		if !follower.nil?
			follower.destroy
		end
		render json: current_user.followers
	end
end
