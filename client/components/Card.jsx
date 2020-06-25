import React from 'react'

class Card extends React.Component {
  render () {
    return (
      <img src={this.props.cardObject.image} />
    )
  }
}


export default Card