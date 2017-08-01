class GamesController < ApplicationController

  def show
    # Renders a React component for the game

  end

  def create
    # Creates a new Game, saves it in the DB, and renders the Show page for that game.
    # The show page then issues a fetch request to api/v1/games#show to retrieve the new game
  end

end
