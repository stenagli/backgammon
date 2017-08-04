class Game < ApplicationRecord
  validates_presence_of :white_user_id, :black_user_id, :turn_and_dice
end

