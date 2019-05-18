module InstopicsHelper
	def get_intopics
		res = []
		current_user.instopics.each do |element|
			res << element.attributes.merge({
				picture: url_for(element.picture),
				likes: element.likes,
				dislikes: element.dislikes 
			})
		end
		res
	end
end
