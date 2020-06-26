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

 handleClick = (event) =>{

    event.preventDefault()

    if(this.state.firstQuestionGuessed == false){

      this.setState({
        firstQuestionGuessed : true
      })
    }
    

    console.log(event.target.value);
    

  
 
 }

 getColours(cardObject){
 
  const suit = cardObject.suit

  switch (suit){

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
        }, ()=>{
          
          this.state.firstCard.colour = this.getColours(this.state.firstCard)
          this.state.secondCard.colour =this.getColours(this.state.secondCard)
          this.state.thirdCard.colour = this.getColours(this.state.thirdCard)
         
  
        } ) 
        
      })
  }

  render() {
    return (
      <>
        <div className="container">
          <Card
            className="card"
            cardId="1"
            cardObject={this.state.firstCard}
            // onClick={this.handleClick}
            firstCardVisible={this.state.firstCardVisible}
          />
          <Card
            className="card"
            cardId="2"
            cardObject={this.state.secondCard}
            // onClick={this.handleClick}
            secondCardVisible={this.state.secondCardVisible}
          />
          <Card
            className="card"
            cardId="3"
            cardObject={this.state.thirdCard}
            // onClick={this.handleClick}
            thirdCardVisible={this.state.thirdCardVisible}
          />
        </div>

        <div className="forest-green player-prompts">
          <h3>Choose!</h3>
          <p>Instructions go here</p>
          <div className="container">
            <button value ="RED"
              className="button-player options"
              onClick={this.handleClick}
            >
              Red
            </button>
            <p>or</p>
            <button value = "BLACK" className="button-player option" onClick={this.handleClick}>
              Black
            </button>
          </div>
        </div>
      </>
    )
  }
}

export default Deck
