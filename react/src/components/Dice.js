import React from 'react'

class Dice extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    let dice = "Dice: "
    this.props.dice.forEach(die => (dice += ` ${die}`))

    return (
      <div>
        <p>{dice}</p>
      </div>
    )
  }
}

export default Dice;
