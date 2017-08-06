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
    return (
      <div className={this.props.className}>{this.props.checkers}|</div>
    )
  }
}

export default Point;
