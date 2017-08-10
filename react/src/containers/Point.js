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

    let clName;
    if(this.props.checkers > 0)
      clName = "white"
    else if(this.props.checkers < 0)
      clName = "black"
    let num;
    if(this.props.checkers > 0)
      num = this.props.checkers;
    else if (this.props.checkers < 0)
      num = -this.props.checkers;

    console.log(this.props.checkers);
    let checkers = new Array(Math.abs(this.props.checkers));
    let checkerDiv = (
          <div className={clName}>{num}</div>
    )
    console.log(checkers);
    for(let i = 0; i < Math.abs(this.props.checkers); i++){
      checkers[i] = (<div
        key={i}
        className={clName}>
        {num}
        </div>)
    }
    console.log(checkers);



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
