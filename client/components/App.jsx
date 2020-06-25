import React from 'react'
import Player from './Player'
import { getPlayers } from '../api'

class App extends React.Component {
  
  state = {
    players: []
  }

  componentDidMount() {
    console.log('component did mount')
    getPlayers()
      .then(player => {
        console.log(player)
        this.setState({
          players: player,
        })
      })
  }

  render () {
    console.log('render')
    return (
      <div>
        <h1>You're the L.O.T.P!</h1>
        <Player key={this.state.players.id} data={this.state.players}/>
      </div>
    )
  }
}


export default App
