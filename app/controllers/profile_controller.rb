class ProfileController < ApplicationController
	include InstopicsHelper
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
		current_user.profile.avatar.purge
		current_user.profile.avatar.attach({
			data: params[:avatar][:data], 
			filename: params[:avatar][:filename]
		})
		
		render json: get_user_data(current_user.id)
	end

	private
  def profile_params
    params.require(:profile).permit(:name, :phone, :age, :sex)
	end
	
	def get_user_data(id)
		user = User.find(id)
		avatar = !user.profile.avatar.nil? ? user.profile.avatar : nil
		user.profile.attributes.merge({ 
			avatar: avatar.attachment.nil? ? "" : url_for(avatar),
			instopics: get_intopics
		})
	end
end
