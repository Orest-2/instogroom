class ProfileController < ApplicationController
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
	
	def get
		render json: get_user_data
	end

	def update
		current_user.profile.update_attributes(profile_params)
		current_user.profile.avatar.purge
		current_user.profile.avatar.attach({data: params[:avatar][:data], filename: params[:avatar][:filename] })
		
		render json: get_user_data
	end

	private
  def profile_params
    params.require(:profile).permit(:name, :phone, :age, :sex)
	end
	
	def get_user_data
		url = !current_user.profile.avatar.nil? ? current_user.profile.avatar : ""
		current_user.profile.attributes.merge({ avatar: url_for(url)})
	end
end
