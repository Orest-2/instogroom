module ProfileHelper
	def get_user_data(id)
		user = User.find(id)
		avatar = !user.profile.avatar.nil? ? user.profile.avatar : nil
		user.profile.attributes.merge({ 
			avatar: avatar.attachment.nil? ? "" : url_for(avatar),
			instopics: get_intopics
			followed: current_user.followers.find_by(followed_id: id)
		})
	end
end
