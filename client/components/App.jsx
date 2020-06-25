import React from "react"
import Deck from "./Deck"
import { getPlayers } from "../api"

class App extends React.Component {
  state = {
    players: [],
  }

  handleClick = e => {
    this.randomPlayer()
  }

  randomPlayer = () => {
    getPlayers().then((player) => {
      let randomIndex = Math.floor(Math.random() * 14)
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

      </div>
    )
  }
}

export default App

