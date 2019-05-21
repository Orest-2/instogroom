module InstopicsHelper
	def get_intopics(id)
		res = []
		user = User.find(id)
		user.instopics.each do |element|
			res << element.attributes.merge({
				picture: url_for(element.picture),
				comments: element.coments,
				likes: element.likes,
				dislikes: element.dislikes 
			})
		end
		res
	end
end
