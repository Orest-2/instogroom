class CreateInstopics < ActiveRecord::Migration[5.2]
  def change
		create_table :instopics do |t|
			t.integer :user_id
      t.integer :likes
      t.integer :dislikes

      t.timestamps
    end
  end
end
