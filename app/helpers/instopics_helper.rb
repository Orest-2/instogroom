module InstopicsHelper
	def get_intopics(id)
		res = []
		coments = []
		user = User.find(id)
		user.instopics.each do |element|
			element.coments.each do |coment|
				coments << coment.attributes.merge({
					user_name: User.find(coment.user_id).profile.name,
					user_avatar: get_user_attachment(User.find(coment.user_id))
				})
			end
			res << element.attributes.merge({
				picture: url_for(element.picture),
				comments: coments,
				likes: element.likes,
				dislikes: element.dislikes
			})
		end
		res
	end
	def get_user_attachment(user)
		user.profile.avatar.attachment.nil? ? "" : url_for(user.profile.avatar)
	end
end
