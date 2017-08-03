class CreateGames < ActiveRecord::Migration[5.1]
  def change
    create_table :games do |t|
      t.integer :user1_id
      t.integer :user2_id
      t.integer :state1
      t.integer :state2
      t.integer :state3
      t.integer :state4
      t.integer :turn_and_dice, limit: 1
    end
  end
end
