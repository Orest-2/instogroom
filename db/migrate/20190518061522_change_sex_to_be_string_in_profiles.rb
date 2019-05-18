class ChangeSexToBeStringInProfiles < ActiveRecord::Migration[5.2]
	def change
		change_column :profiles, :sex, :string
  end
end
