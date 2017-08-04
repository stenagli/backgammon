class Api::V1::GamesController < ApplicationController

  def show
    #Retrieve a Game from the DB and send it in the response object
    game = Game.find(params[:id])
    
    turn_and_dice = game.turn_and_dice
    #  Bit 8 is whether the current user is white
    turn_and_dice[7] = current_user.id == game.white_user_id ? 1 : 0

    # In DB, bit 7 is whether it's white's turn
    # For the client, it's whether it's the current user's turn,
    turn_and_dice[6] = (turn_and_dice[7] == turn_and_dice[6]) ? 1 : 0

    game.turn_and_dice = turn_and_dice

    render json: game
  end

  def update
    # Update the game with id params[:id] and rebroadcast
    # This should be handled by ActionCable instead.
  end

end
