import React from 'react'

class Bar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {

    return (
      <div className={this.props.className}>
      </div>
    )
  }
}

export default Bar;
