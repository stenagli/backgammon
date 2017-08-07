import React from 'react'

class Point extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    //let column
    //let stop = min(this.props.checkers, 5)
    //for(let i = 0, i < stop, i++){

    //}

    let clName = (this.props.checkers > 0) ? this.props.className + " white" : this.props.className
    let checkers;
    if(this.props.checkers > 0)
      checkers = this.props.checkers;
    else if (this.props.checkers < 0)
      checkers = -this.props.checkers;


    return (
      <div onClick={this.props.onClick} className={clName}><p>{checkers}</p></div>
    )
  }
}

export default Point;
