class InstopicsController < ApplicationController
	include InstopicsHelper
	before_action :authenticate_user!

	def create
		instopic = current_user.instopics.create(instopic_params)
		instopic.picture.attach({
			data: params[:picture][:data],
			filename: params[:picture][:filename]
		})
		render json: get_intopics(current_user.id)
	end

	def add_comment
		instopic = Instopic.find(params[:id])
		if !instopic.nil?
			instopic.coments.create(user_id: current_user.id, coment: params[:comment])

		end
		render json: get_intopics(current_user.id)
	end

	def like
		instopic = Instopic.find(params[:id])
		if !instopic.likes.find_by(user_id: current_user.id)
			instopic.likes.create(user_id: current_user.id)
		end
		render json: instopic.likes
	end

	def dislike
		instopic = Instopic.find(params[:id])
		if !instopic.dislikes.find_by(user_id: current_user.id)
			instopic.dislikes.create(user_id: current_user.id)
		end
		render json: instopic.dislikes
	end

	def delete
		instopic = current_user.instopics.find(params[:id])
		instopic.destroy_all
	end

	private
  def instopic_params
    params.require(:instopic).permit(:description)
	end
end
