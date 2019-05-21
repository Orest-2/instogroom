class ProfileController < ApplicationController
	include InstopicsHelper
	include ProfileHelper
	before_action :authenticate_user!

	def index
		if current_user.profile.nil?
			current_user.create_profile({
				name: '',
				phone: '',
				age: -1,
				sex: '',
			})
		end
	end

	def get_other
		render json: get_user_data(params["id"])
	end
	
	def get
		render json: get_user_data(current_user.id)
	end

	def update
		current_user.profile.update_attributes(profile_params)

		if !params[:avatar][:data].nil?
			current_user.profile.avatar.purge
			current_user.profile.avatar.attach({
				data: params[:avatar][:data], 
				filename: params[:avatar][:filename]
			})
		end
		
		render json: get_user_data(current_user.id)
	end

	private
  def profile_params
    params.require(:profile).permit(:name, :phone, :age, :sex)
	end
end
