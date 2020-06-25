import React from 'react'
import request from 'superagent'

class Deck extends React.Component {
  state = {
    deck: {},

    firstGuessCorrect: false,
    secondGuessCorrect: false,
    thirdGuessCorrect: false,

    firstCardVisible: false,
    secondCardVisible: false,
    thirdCardVisible: false,
  }

  componentDidMount() {
    this.getDeck
  }

  getDeck = () => {
    request.get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
      .then(response => {
        console.log(response)
      })
  }

  render() {
    return (
      <div>hello</div>
      
    )
  }
}

export default Deck