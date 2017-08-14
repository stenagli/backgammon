import React from 'react'
import Die from './Die'

class Info extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    let dice = [];
    this.props.dice.forEach(die => {
      dice.push(
        <Die num={die} />
      )
    })

    let turn;
    if(this.props.white){
      if(this.props.myTurn)
        turn = "white"
      else
        turn = "black"
    }
    else {
      if(this.props.myTurn)
        turn = "black"
      else
        turn="white"
    }

    return (
      <div className="info">
      Playing as: <div className={this.props.white ? "white" : "black"}></div>
      Turn: <div className={turn}></div>
        Dice:   {dice}
      </div>
    )
  }
}

export default Info;
