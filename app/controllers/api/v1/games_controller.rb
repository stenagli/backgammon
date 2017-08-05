class Api::V1::GamesController < ApplicationController

  def show
    #Retrieve a Game from the DB and send it in the response object
    game = Game.find(params[:id])
    
    data = Array.new(5)
    data[0] = game.state1.nil? ? 0 : game.state1
    data[1] = game.state2.nil? ? 0 : game.state2
    data[2] = game.state3.nil? ? 0 : game.state3
    data[3] = game.state4.nil? ? 0 : game.state4

    turn_and_dice = game.turn_and_dice
    #  Bit 8 is whether the current user is white
    turn_and_dice &= 0x7F # clear the bit before setting it
    turn_and_dice |= (current_user.id == game.white_user_id ? 1 : 0) << 7

    # In DB, bit 7 is whether it's white's turn
    # For the client, it's whether it's the current user's turn,
    #turn_and_dice[6] = (turn_and_dice[7] == turn_and_dice[6]) ? 1 : 0

    data[4] = turn_and_dice

    # Convert to binary string of 5 32-bit signed integers
    data = data.pack("l5")

    #render json: game
    send_data data
  end

  def update
    # Update the game with id params[:id] and rebroadcast
    # This should be handled by ActionCable instead.
  end

end
