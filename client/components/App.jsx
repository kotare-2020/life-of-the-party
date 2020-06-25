import React from "react"
import Deck from "./Deck"
import { getPlayers } from "../api"

let randomIndex = Math.floor(Math.random() * 14)

class App extends React.Component {
  state = {
    players: [],
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
    this.randomPlayer()
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

        <div className="forest-green">
          <input
            className="button-player"
            onClick={this.handleClick}
            type="submit"
            value="Player:"
          />
        <p>
          <em> {this.state.players.player} </em>
        </p>
        </div>

        <Deck />
        
        <div className="forest-green player-prompts" >
          <h3>Choose!</h3>
          <p>Instructions go here</p>
          <div className="container">
            <input className="button-player options" type="text" value="Red"/>
              <p>or</p>
            <input className="button-player options" type="text" value="Black"/>
          </div>

        </div>

      </div>
    )
  }
}

export default App

