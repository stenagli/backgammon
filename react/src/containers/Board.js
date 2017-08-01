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

  componentDidMount() {
    let newBoard = new Array(24);
    newBoard[0] = -2;
    newBoard[5] = 5;
    newBoard[7] = 3;
    newBoard[11] = -5;
    newBoard[12] = 5;
    newBoard[16] = -3;
    newBoard[18] = -5;
    newBoard[23] = 2;

  }

  render() {
    return (
      <p>I am a game board!</p>
    )
  }
}

export default Board;