import React from 'react'
import Player from './Player'
import Deck from './Deck'
import { getPlayers } from '../api'

class App extends React.Component {
  
  state = {
    players: []
  }

  componentDidMount() {
    getPlayers()
      .then(player => {
        console.log(player)
        this.setState({
          players: player,
        })
      })
  }

  render () {
    return (
      <div>
        <h1>You're the L.O.T.P!</h1>
        <Deck />
        {/* <Player key={this.state.players.id} data={this.state.players}/> */}
      </div>
    )
  }
}


export default App