import React from 'react'

class Info extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    let dice = "Dice: "
    this.props.dice.forEach(die => (dice += ` ${die}`))

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
        <div>{dice}</div>
      </div>
    )
  }
}

export default Info;
