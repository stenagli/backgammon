import React from 'react'
import Point from './Point'

class Board extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      white: null,
      myTurn: null,
      board: [],
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

  compressBoard(b) {
    let s1 = 0;
    for(let i = 0; i < 6; i++) {
      s1 |= ( (b[i] & 0x1F) << 5*i)
    }
    // last 2 bits
    s1 |= (b[6] & 0x3) << 30;

    let s2 = 0;
    // remaining 3 bits from b[6]
    s2 |= (b[6] >>> 2) & 0x7;
    // next 25 bits
    for(let i = 7; i < 12; i++) {
      s2 |= (b[i] & 0x1F) << ((5*(i-7)) + 3)
    }
    // last 4 bits
    s2 |= (b[12] & 0xF) << 28;

    let s3 = 0;
    // remaining 1 bit from b[12]
    s3 |= (b[12] >>> 4) & 0x1 
    // next 30 bits
    for(let i = 13; i < 19; i++) {
      s3 |= (b[i] & 0x1F) << ((5*(i-13)) + 1)
    }
    // last bit
    s3 |= (b[19] & 0x1) << 31;

    let s4 = 0;
    // first 4 bits from b[19]
    s4 |= (b[19] >>> 1) & 0xF;
    // remaining 20 bits from normal 5-bit board
    for(let i = 20; i < 24; i++) {
      s4 |= (b[i] & 0x1F) << ((5*(i-20)) + 4)
    }
    // 4 bits for white's bar
    s4 |= (b[24] & 0xF) << 24;
    // 4 bits for black's bar
    s4 |= (b[25] & 0xF) << 28;

    // Set bit 7 of turn_and_dice, i.e. whether white's turn
    let turn_and_dice = 0;
    turn_and_dice |= (this.state.white !== this.state.myTurn ? 1 : 0) << 6;



  }

  componentDidMount() {
      fetch(`/api/v1/games/${this.props.gameId}`, {
        credentials: 'same-origin'
      })
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          let errorMessage = `${response.status} (${response.statusText})`,
              error = new Error(errorMessage);
          throw(error);
        }
      })
      .then(response => response.arrayBuffer())
      .then(arrayBuffer => {
        let view = new Int32Array(arrayBuffer);
        let state1 = view[0];
        console.log(state1);
        let state2 = view[1];
        let state3 = view[2];
        let state4 = view[3];
        let turn_and_dice = view[4];
        console.log(turn_and_dice)
        let die1 = turn_and_dice & 0x7;
        console.log(die1)
        turn_and_dice >>>= 3;
        let die2 = turn_and_dice & 0x7;
        console.log(die2)
        turn_and_dice >>>= 3;
        // It is myTurn if the final two bits are equal
        let myTurn = turn_and_dice === 0x0 || turn_and_dice === 0x3
        console.log(myTurn)
        turn_and_dice >>>= 1;
        let white = turn_and_dice === 0x1;
        console.log(white)

        this.setState({
          white: white,
          myTurn: myTurn,
          die1: die1,
          die2: die2
        })
        if(state1 === 0 && state2 === 0 && state3 === 0 && state4 === 0)
          this.newBoard();
        else
          this.remoteBoard(state1, state2, state3, state4);
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
