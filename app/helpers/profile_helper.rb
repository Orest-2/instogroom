module ProfileHelper
	def get_user_data(id)
		user = User.find(id)
		avatar = !user.profile.avatar.nil? ? user.profile.avatar : nil
		user.profile.attributes.merge({ 
			avatar: avatar.attachment.nil? ? "" : url_for(avatar),
			instopics: get_intopics(id),
			followed: !current_user.follows.find_by(followed_id: id).nil?,
			followedCount: current_user.follows.length,
			followersCount: Follow.where(followed_id: current_user.id).length
		})
	end
end
