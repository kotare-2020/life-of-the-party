import React from "react"
import Deck from "./Deck"
import { getPlayers } from "../api"

let randomIndex = Math.floor(Math.random() * 14)

class App extends React.Component {
  state = {
    players: [],
  }

  handleClick = e => {
    this.randomPlayer()
  }

  randomPlayer = () => {
    getPlayers().then((player) => {
      console.log(player)
      this.setState({
        players: player[randomIndex],
      })
    })
  }

  componentDidMount() {
    console.log("component did mount")
  }

  render() {
    console.log("render")
    return (
      <div>
        <header className="header">
          <h1>
            <span className="red">Red</span>
            <span className="small"> or </span>
            <span className="black">Black</span>
          </h1>
        </header>

        <div className="forest-green player-container">
          <button className="button-player" onClick={this.handleClick}>Player</button>
        <p>
          <em>{this.state.players.player}</em>
        </p>
        </div>

        <Deck />
        
        {/* <div className="forest-green player-prompts" >
          <h3>Choose!</h3>
          <p>Instructions go here</p>
          <div className="container">
          <button className="button-player options" onClick={this.handleClick}>Red</button>
              <p>or</p>
          <button className="button-player option" onClick={this.handleClick}>Black</button>

          </div>

        </div> */}

      </div>
    )
  }
}

export default App

