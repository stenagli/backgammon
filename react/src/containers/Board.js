import React from 'react'

class Board extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      white: true,
      board: []
      die1: null,
      die2: null
    }
  }

  newBoard() {
    let newBoard = new Array(24);
    newBoard[0] = -2;
    newBoard[5] = 5;
    newBoard[7] = 3;
    newBoard[11] = -5;
    newBoard[12] = 5;
    newBoard[16] = -3;
    newBoard[18] = -5;
    newBoard[23] = 2;
    die1 = Math.floor(Math.random() * 6) + 1
    die2 = Math.floor(Math.random() * 6) + 1
    // Sort the dice
    if(die1 > die2) {
      temp = die1;
      die1 = die2;
      die2 = temp;
    }
    this.setState( {
      board: newBoard,
      die1: die1,
      die2: die2
    } );

  }

  componentDidMount() {
    if(this.props.new)
      newBoard();
    else {
      //fetch(`/api/v1/games/${this.props.gameId}`)
    }
  }

  render() {
    return (
      <p>I am a game board!</p>
    )
  }
}

export default Board;
