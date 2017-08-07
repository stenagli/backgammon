import React from 'react'

class Dice extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    let lis = this.props.dice.map((die) => {
      return(<li>{die}</li>)
    });

    return (
      <div>
        <p>Dice:</p>
        <ul>
          {lis}
        </ul>
      </div>
    )
  }
}

export default Dice;
