class RenameUsersInGames < ActiveRecord::Migration[5.1]
  def change
    rename_column :games, :user1_id, :white_user_id
    rename_column :games, :user2_id, :black_user_id
  end
end
