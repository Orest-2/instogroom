class CreateComents < ActiveRecord::Migration[5.2]
  def change
    create_table :coments do |t|
      t.integer 	:user_id
      t.integer :insttopic_id
      t.text 		:coment

      t.timestamps
    end
  end
end
