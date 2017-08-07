import React from 'react'
import Point from './Point'
import Dice from '../components/Dice'

class Board extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      white: null,
      myTurn: null,
      board: [],
      dice: [],
      pointClicked: null,
      possibleMoves: []
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(i) {
    console.log("handleClick called");
    console.log(`handleClick(${i})`);
    // If board[i] is clicked,
    // add all possible indexes that the checker could be moved to
    // into this.state.possibleMoves
    //
    // If i clicked is within possibleMoves, 
    // remove a checker from pointClicked, and
    // put one at the i clicked.
    // Otherwise, update pointClicked and possibleMoves.

    let b = this.state.board;

    if(this.state.possibleMoves.includes(i)){
      // Move the checker from pointClicked to i
      if(this.state.white){
        b[this.state.pointClicked] -= 1;
        b[i] += 1;
      }
      else {
        b[this.state.pointClicked] += 1;
        b[i] -= 1;
      }

      // Remove the die from dice
      let dice = this.state.dice;
      dice.splice(dice.indexOf(this.state.pointClicked - i), 1);
      this.setState({
        board: b,
        dice: dice,
        possibleMoves: []
      })


      if(dice.length === 0){
        // TODO Send the new board to the server via ActionCable
        // and also flip the turn bit both in react and 
        // network state
      }
    }
    else if((this.state.white && (b[i] > 0)) || ((!this.state.white) && (b[i] < 0))) {
      // user's piece
      console.log("user piece");
      console.log(!this.state.white);
      console.log(b[i] < 0);
      this.setState( {pointClicked: i} );
      let possibleMoves = [];
      this.state.dice.forEach ((die) => {
        if((i - die) >= 0) {
          if(this.state.white && (b[i-die] >= -1)){
            possibleMoves.push(i-die)
          }
          else if(!this.state.white && (b[i-die] <= 1)){
            possibleMoves.push(i-die)
          }
        }
      });
      console.log("possibleMoves");
      console.log(possibleMoves);
      this.setState( {possibleMoves: possibleMoves} );
    }
  }

  newBoard(white) {
    let newBoard = new Array(26);
    newBoard.fill(0);
    newBoard[0] = -2;
    newBoard[5] = 5;
    newBoard[7] = 3;
    newBoard[11] = -5;
    newBoard[12] = 5;
    newBoard[16] = -3;
    newBoard[18] = -5;
    newBoard[23] = 2;

    if(!white) {
      // reverse the board
      for(let i = 0; i < 12; i++){
        let temp = newBoard[i];
        newBoard[i] = newBoard[23-i];
        newBoard[23-i] = temp;
      }
    }

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

    if(!white) {
      // reverse the board
      for(let i = 0; i < 12; i++){
        let temp = newBoard[i];
        newBoard[i] = newBoard[23-i];
        newBoard[23-i] = temp;
      }
    }

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
        let dice = [die1, die2];
        if(die1 === die2) // doubles
          dice = [...dice, ...dice];
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
          dice: dice,
        })
        if(state1 === 0 && state2 === 0 && state3 === 0 && state4 === 0)
          this.newBoard(white);
        else
          this.remoteBoard(state1, state2, state3, state4, white);

        console.log("Starting subscription")
        App.gameChannel = App.cable.subscriptions.create(
          {
            channel: "GameChannel",
            game_id: this.props.gameId
          },
          {
            connected: () => console.log("GameChannel connected"),
            disconnected: () => console.log("GameChannel disconnected"),
            received: data => console.log(data)
          }
        );

        console.log("Finished subscription, starting message")

        App.gameChannel.send("Hello World!");
        App.gameChannel.send({ sent_by: "Paul", body: "This is a cool chat app." })

        console.log("Finished message")
          })
      .catch(error => console.error(`Error in fetch: ${error.message}`));

    App.gameChannel.send({message: "Test message!"});

  }

  render() {

    // TODO: Add class to Points
    // with an index in this.state.possibleMoves
    // and pass down a wrapper function for handleClick(i)
    let topRow = new Array(12);
    for(let i = 0; i < 12; i++) {
      let clName = (this.state.possibleMoves.includes(12+i) ? "topPoint possibleMove" : "topPoint")
      topRow[i] = (<Point
        className={clName}
        key={i}
        checkers = {this.state.board[12+i]}
        onClick={()=>this.handleClick(12+i)}
        />)
    }

    let bottomRow = new Array(12);
    for(let i = 0; i < 12; i++) {
      let clName = (this.state.possibleMoves.includes(11-i) ? "bottomPoint possibleMove" : "bottomPoint")
      bottomRow[i] = (<Point
        className={clName}
        key={i}
        checkers={this.state.board[11-i]}
        onClick={()=>this.handleClick(11-i)}
        />)
    }

    return (
      <div>
        <p>I am a React game board!</p>
        <Dice dice={this.state.dice} />
        <div className="topRow">
          {topRow}  
        </div>
        <div className="bottomRow">
          {bottomRow}  
        </div>
      </div>


    )
  }
}

export default Board;
