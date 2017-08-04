import React from 'react'
import Point from './Point''

class Board extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      white: null,
      myTurn: null,
      board: []
      die1: null,
      die2: null
    }
  }

  newBoard() {
    let newBoard = new Array(26);
    newBoard[0] = -2;
    newBoard[5] = 5;
    newBoard[7] = 3;
    newBoard[11] = -5;
    newBoard[12] = 5;
    newBoard[16] = -3;
    newBoard[18] = -5;
    newBoard[23] = 2;
    this.setState( {board: newBoard} );
  }

  remoteBoard(s1, s2, s3, s4) {
    let board = new Array(26);

    // extract s1's data
    for(let i = 0; i < 7; i++) {
      board[i] = s1 & 0x1F
      // two's complement the 5 bit value
      board[i] -= (board[i] & 0x10) * 2;

      s1 >>>= 5;
    }
    // board[6]'s first two bits were set above;
    // set the other three from the beginning of s2
    board[6] &= ((s2 & 0x7) << 2);
    // two's complement the 5 bit value
    board[6] -= (board[6] & 0x10) * 2;

    s2 >>>= 3;

    // extract the remaining bits from s2
    for(let i = 7; i < 13; i++) {
      board[i] = s2 & 0x1F
      // two's complement the 5 bit value
      board[i] -= (board[i] & 0x10) * 2;

      s2 >>>= 5;
    }
    // board[12]'s last bit is in s3
    board[12] &= ((s3 & 0x1) << 4);
    // two's complement the 5 bit value
    board[12] -= (board[12] & 0x10) * 2;

    s3 >>>= 1;

    // extract the remaining bits from s3
    for(let i = 13; i < 20; i++) {
      board[i] = s3 & 0x1F;
      // two's complement the 5 bit value
      board[i] -= (board[i] & 0x10) * 2;

      s3 >>>= 5;
    }
    // board[19]'s remaining 4 bits are in s4
    board[19] &= ((s4 & 0xF) << 1);
    // two's complement the 5 bit value
    board[19] -= (board[19] & 0x10) * 2;

    s4 >>= 4;

    //extract remaining bits from s4
    for(let i = 20; i < 24; i++) {
      board[i] = s4 & 0x1F;
      // two's complement the 5 bit value
      board[i] -= (board[i] & 0x10) * 2;

      s4 >>>= 5;
    }

    // extract next 4 bits for white's bar
    board[24] = s4 & 0xF;
    s4 >>>= 4;
    // extract next 4 bits for black's bar
    board[25] = s4 & 0xF;

    this.setState( {board: board} );
  }

  componentDidMount() {
      fetch(`/api/v1/games/${this.props.gameId}`)
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          let errorMessage = `${response.status} (${response.statusText})`,
              error = new Error(errorMessage);
          throw(error);
        }
      })
      .then(response => response.json())
      .then(body => {
        this.setState({
          white: body.turn_and_dice & (1 << 7)
          myTurn: body.turn_and_dice & (1 << 6)
          die1: body.turn_and_dice & (0x7) // bits 1-3
          die2: body.turn_and_dice & (0x38) // bits 4-6
        })
        if(body.state1 === null)
          newBoard();
        else
          remoteBoard(body.state1, body.state2, body.state3, body.state4);
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render() {
    return (
      <p>I am a React game board!</p>
    )
  }
}

export default Board;
