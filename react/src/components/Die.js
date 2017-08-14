import React from 'react'

class Die extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {

    let clName = "die";
    switch(this.props.num){
      case 1:
        clName += " die1"
        break;
      case 2:
        clName += " die2"
        break;
      case 3:
        clName += " die3"
        break;
      case 4:
        clName += " die4"
        break;
      case 5:
        clName += " die5"
        break;
      case 6:
        clName += " die6"
        break;
    }

    return (
      <div className={clName}></div>
    )
  }
}

export default Die;
