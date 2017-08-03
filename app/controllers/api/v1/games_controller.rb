class Api::V1::GamesController < ApplicationController

  def show
    #Retrieve a Game from the DB and send it in the response object
  end

  def create
    # Create a new game, determine who is white and who is black, and return that and dice roll to clients
  end

  def update
    # Update the game with id params[:id] and rebroadcast
  end

end
