import React from 'react'

class Point extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {

    let clName;
    if(this.props.checkers > 0)
      clName = "white"
    else if(this.props.checkers < 0)
      clName = "black"

    let checkers = new Array(Math.abs(this.props.checkers));
    for(let i = 0; i < checkers.length; i++){
      checkers[i] = (<div
        key={i}
        className={clName}>
        </div>)
    }
    
    // Add overflow numbers if necessary
    if(this.props.checkers >= 6 || this.props.checkers <= -6){
      if(this.props.className.includes("topPoint")){
        checkers[0] = (<div
          key={0}
          className={clName}>
          {Math.abs(this.props.checkers)}
          </div>)
      }
      else {
        checkers[checkers.length-1] = (<div
          key={checkers.length-1}
          className={clName}>
          {Math.abs(this.props.checkers)}
          </div>)
      }
    }



    return (
      <div onClick={this.props.onClick} className={this.props.className}>
      <div className="checkerContainerOuter">
        <div className="checkerContainerInner">
          {checkers}
        </div>
      </div>
    </div>
    )
  }
}

export default Point;
