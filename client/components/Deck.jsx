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
  }

  componentDidMount() {
    this.getDeck()
  }

  handleClick = (event) => {
    event.preventDefault()
    let buttonValue = event.target.value
    let cardColour = this.state.firstCard.colour

    if (this.state.firstQuestionGuessed == false) {
      this.setState({
        firstQuestionGuessed: true,
      })
      // Flip the card
      if (buttonValue == cardColour) {
        //Win condition
        // Display thumbs up emoji
        console.log("First guessed correctly")
      } else {
        // Lose condition
        console.log("First guessed incorrectly")
        // Set firstQuestionGuessed to false, display drink emoji
      }

      // Logic for second question
    } else if (this.state.secondQuestionGuessed == false) {
      if (this.state.firstCard.cardValue > this.state.secondCard.cardValue && buttonValue == "LOWER") {
        console.log("You win!")
        this.setState({
          secondQuestionGuessed: true
        })
      } else if (this.state.firstCard.cardValue < this.state.secondCard.cardValue && buttonValue == "HIGHER") {
        console.log("You win!")
        this.setState({
          secondQuestionGuessed: true,
        })
      } else if (this.state.firstCard.cardValue == this.state.secondCard.cardValue) {
        console.log("You win!")
        this.setState({
          secondQuestionGuessed: true,
        })
      } else {
        console.log("Second guessed incorrectly, DRINK")
      }
    } else if (this.state.thirdQuestionGuessed == false) {
      let lowCard
      let highCard
      let thirdCardValue = this.state.thirdCard.cardValue

      if (this.state.firstCard.cardValue < this.state.secondCard.cardValue) {
        lowCard = this.state.firstCard.cardValue
        highCard = this.state.secondCard.cardValue
      } else if (this.state.firstCard.cardValue > this.state.secondCard.cardValue) {
        lowCard = this.state.secondCard.cardValue
        highCard = this.state.firstCard.cardValue
      } else {
        lowCard = this.state.firstCard.cardValue
        highCard = this.state.secondCard.cardValue
      }

      if (thirdCardValue == lowCard || thirdCardValue == highCard) {
        if (buttonValue == "INSIDE") {
          console.log("Congrats, you win!")
            this.setState({
              thirdQuestionGuessed: true
            })
        } else if (buttonValue == "OUTSIDE") {
          console.log("YOU LOSE! DRINK")
          this.setState({
            thirdQuestionGuessed: true
          })
        }
      } else if (thirdCardValue < lowCard || thirdCardValue > highCard) {
        if (buttonValue == "OUTSIDE") {
          console.log("Congrats, you win!")
          this.setState({
            thirdQuestionGuessed: true
          })
        } else if (buttonValue == "INSIDE") {
          console.log("u lose, DRINK")
          this.setState({
            thirdQuestionGuessed: true
          })
        }
      } else if (thirdCardValue > lowCard && thirdCardValue < highCard) {
        if (buttonValue == "INSIDE") {
          console.log("Congrats, you win!")
          this.setState({
            thirdQuestionGuessed: true
          })
        } else if (buttonValue == "OUTSIDE") {
          console.log("u lose, DRINK")
          this.setState({
            thirdQuestionGuessed: true
          })
        }
      }
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

    if (cardValue == numberArr.find((element) => element == cardValue)) {
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
        this.setState(
          {
            firstCard: res.body.cards[0],
            secondCard: res.body.cards[1],
            thirdCard: res.body.cards[2],
          },
          () => {
            this.state.firstCard.colour = this.getColours(this.state.firstCard)
            this.state.secondCard.colour = this.getColours(
              this.state.secondCard
            )
            this.state.thirdCard.colour = this.getColours(this.state.thirdCard)

            this.state.firstCard.cardValue = this.translateCardValues(
              this.state.firstCard
            )
            this.state.secondCard.cardValue = this.translateCardValues(
              this.state.secondCard
            )
            this.state.thirdCard.cardValue = this.translateCardValues(
              this.state.thirdCard
            )
          }
        )
      })
  }

  checkForEmptyDeck = () => {
    if (this.state.remainingCards < 3) {
      this.getDeck()
    }
  }

  refreshPage = () => {
    location.reload()
  }

  render() {
    return (
      <>
        <div className="container">
          <Card
            cardObject={this.state.firstCard}
            cardVisible={this.state.firstQuestionGuessed}
          />
          <Card
            cardObject={this.state.secondCard}
            cardVisible={this.state.secondQuestionGuessed}
          />
          <Card
            cardObject={this.state.thirdCard}
            cardVisible={this.state.thirdQuestionGuessed}
          />
        </div>

        <div className="forest-green player-prompts">
          <h3>Choose!</h3>

          {/* Red or black options */}
          {!this.state.firstQuestionGuessed && (
            <div className="container container-cards">
              <button
                value="RED"
                className="button-player options"
                onClick={this.handleClick}
              >
                Red
              </button>

              <p>or</p>

              <button
                value="BLACK"
                className="button-player options"
                onClick={this.handleClick}
              >
                Black
              </button>
            </div>
          )}
      
    {/* Higher or Lower options */}

          {this.state.firstQuestionGuessed &&
            !this.state.secondQuestionGuessed && (
              <div className="container container-cards">
                <button
                  value="HIGHER"
                  className="button-player options"
                  onClick={this.handleClick}
                >
                  Higher
                </button>

                <p>or</p>
                <button
                  value="LOWER"
                  className="button-player options"
                  onClick={this.handleClick}
                >
                  Lower
                </button>
              </div>
            )}

          {/* Inside or Outside options */}
          {this.state.secondQuestionGuessed &&
            !this.state.thirdQuestionGuessed && (
              <div className="container container-cards">
                <button
                  value="INSIDE"
                  className="button-player options"
                  onClick={this.handleClick}
                >
                  Inside
                </button>

                <p>or</p>

                <button
                  value="OUTSIDE"
                  className="button-player options"
                  onClick={this.handleClick}
                >
                  Outside
                </button>
              </div>
            )}
          <div className="container container-cards">
            <button value="RESET" className="button-player options" onClick={this.refreshPage}>Reset</button>
          </div>
        </div>
      </>
    )
  }
}

export default Deck
