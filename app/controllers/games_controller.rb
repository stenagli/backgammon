class GamesController < ApplicationController

  def show
    # Renders a React component for the game

  end

  def create
    # Creates a new Game, saves it in the DB, and renders the Show page for that game.
    # The show page then issues a fetch request to api/v1/games#show to retrieve the new game
    if rand(2).zero?
      white_user_id = current_user.id
      black_user_id = params[:user_id]
    else
      white_user_id = params[:user_id]
      black_user_id = current_user.id
    end

    die1 = rand(1..6)
    die2 = rand(1..6)

    # bits 1-3 are die1, 4-6 die2, 7 whether white's turn
    dice_and_turn = die1 & (die2 << 3) & (1 << 6)

    @game = Game.create({
      white_user_id: white_user_id,
      black_user_id: black_user_id,
      dice_and_turn: dice_and_turn
    })

    redirect_to @game

  end

  def new
    @users = User.select("id","username")
  end
end
