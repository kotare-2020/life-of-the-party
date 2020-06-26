import React from "react"
import request from "superagent"
import Card from "./Card"

class Deck extends React.Component {
  state = {
    deckId: {},
    remainingCards: null,

    firstCard: {},
    secondCard: {},
    thirdCard: {},

    firstQuestionGuessed: false,
    secondQuestionGuessed: false,
    thirdQuestionGuessed: false,

    firstCardVisible: false,
    secondCardVisible: false,
    thirdCardVisible: false,
  }

  componentDidMount() {
    this.getDeck()
  }

  handleClick = (event) => {
    event.preventDefault()
    let buttonValue = event.target.value
    let cardColour = this.state.firstCard.colour

    if (this.state.firstQuestionGuessed == false) {
      // Flip the card
      if (buttonValue == cardColour) {
        //Win condition
        // Display thumbs up emoji
        console.log("First guessed correctly")
        this.setState({
          firstQuestionGuessed: true
        })
      } else {
        // Lose condition
        console.log("First guessed incorrectly")
        // Set firstQuestionGuessed to false, display drink emoji
      }

      // Logic for second question
    } else if (this.state.secondQuestionGuessed == false) {
      if (this.state.firstCard.cardValue > this.state.secondCard.cardValue && buttonValue == "HIGHER") {
        // win condition
        console.log("win")
        this.setState({
          secondQuestionGuessed: true
        })
      } else if (this.state.firstCard.cardValue < this.state.secondCard.cardValue && buttonValue == "LOWER") {
        // win condition
        console.log("win")
        this.setState({
          secondQuestionGuessed: true
        })
      } else if (this.state.firstCard.cardValue == this.state.secondCard.cardValue) {
        // win condition for now
        console.log("Win")
        this.setState({
          secondQuestionGuessed: true
        })
      } else {
        // lose condition
        console.log("Second guessed incorrectly")
        // display drinky emoji, reset board maybe???
      }

    } else if (this.state.thirdQuestionGuessed == false) {
      // Do the logic for third question here
    }
  }

  getColours(cardObject) {
    const suit = cardObject.suit

    switch (suit) {
      case "SPADES":
        return "BLACK"

      case "CLUBS":
        return "BLACK"

      case "HEARTS":
        return "RED"

      case "DIAMONDS":
        return "RED"
    }
  }

  translateCardValues(cardObject) {
    const cardValue = cardObject.value
    const numberArr = ["2", "3", "4", "5", "6", "7", "8", "9", "10"]

    if (cardValue == numberArr.find(element => element == cardValue)) {
      return Number(cardValue)
    } else {
      switch (cardValue) {
        case "JACK":
          return 11
        case "QUEEN":
          return 12
        case "KING":
          return 13
        case "ACE":
          return 14
      }
    }
  }


  // Function will get a new deck from external API and replace deck object in state
  getDeck = () => {
    request
      .get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
      .then((res) => {
        this.setState(
          {
            deckId: res.body.deck_id,
            remainingCards: res.body.remaining,
          },
          () => {
            //Currently this will draw 3 cards by default but we potentially wanna do something else
            this.draw3Cards()
          }
        )
      })
  }

  // Draw 3 cards and save them to state
  draw3Cards = () => {
    let deckId = this.state.deckId

    request
      .get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=3`)
      .then((res) => {
        this.setState({
          firstCard: res.body.cards[0],
          secondCard: res.body.cards[1],
          thirdCard: res.body.cards[2],
        }, () => {
          this.state.firstCard.colour = this.getColours(this.state.firstCard)
          this.state.secondCard.colour = this.getColours(this.state.secondCard)
          this.state.thirdCard.colour = this.getColours(this.state.thirdCard)

          this.state.firstCard.cardValue = this.translateCardValues(this.state.firstCard)
          this.state.secondCard.cardValue = this.translateCardValues(this.state.secondCard)
          this.state.thirdCard.cardValue = this.translateCardValues(this.state.thirdCard)
        })
      })
  }

  checkForEmptyDeck = () => {
    if (this.state.remainingCards < 3) {
      this.getDeck()
    }
  }

  render() {
    return (
      <>
        <div className="container">
          <Card
            cardObject={this.state.firstCard}
            firstCardVisible={this.state.firstCardVisible}
          />
          <Card
            cardObject={this.state.secondCard}
            secondCardVisible={this.state.secondCardVisible}
          />
          <Card
            cardObject={this.state.thirdCard}
            thirdCardVisible={this.state.thirdCardVisible}
          />
        </div>

        <div className="forest-green player-prompts">
          <h3>Choose!</h3>

          {/* Red or black options */}
          <div className="container">
            <button value="RED"
              className="button-player options"
              onClick={this.handleClick}
            >
              Red
            </button>
            <p>or</p>

            <button value="BLACK" className="button-player option" onClick={this.handleClick}>
              Black
            </button>
          </div>

          {/* Higher or Lower options */}
          <div className="container">
            <button value="HIGHER"
              className="button-player options"
              onClick={this.handleClick}
            >
              Higher
            </button>
            <p>or</p>
            <button value="LOWER" className="button-player options" onClick={this.handleClick}>
              Lower
            </button>
          </div>

          {/* Inside or Outside options */}
          <div className="container">
            <button
              className="button-player options"
              onClick={this.handleClick}
            >
              Inside
            </button>
            <p>or</p>
            <button className="button-player options" onClick={this.handleClick}>
              Outside
            </button>
          </div>

        </div>
      </>
    )
  }
}

export default Deck
