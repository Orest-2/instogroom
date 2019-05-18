class Profile < ApplicationRecord
	belongs_to :user

	has_one_base64_attached :avatar
end
