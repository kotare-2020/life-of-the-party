import React from "react"

class Card extends React.Component {
  render() {
    return (
      <div className="flip-card">
        <div className="flip-card-inner">
          <div className="flip-card-front">
            <img className="card card-back" src='/playing_card.png' />

          </div>
          <div className="flip-card-back">
            <img className="card" src={this.props.cardObject.image} />
          </div>
        </div>
      </div>
    )
  }
}

export default Card
