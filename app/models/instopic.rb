class Instopic < ApplicationRecord
	belongs_to :user

	has_one_base64_attached :picture
	has_many :coments
end
