import React from 'react'
import { getPlayers } from '../api'

let randomIndex = Math.floor(Math.random()*14)

class App extends React.Component {
  
  state = {
    players: []
  }

  randomPlayer = () => {
    getPlayers()
    .then(player => {
      console.log(player)
      this.setState({
        players: player[randomIndex]
      })
    })
  }

  componentDidMount() {
    console.log('component did mount')
    this.randomPlayer()
  }
  
  render () {
    console.log('render')
    return (
      <div>
        <h1>You're the L.O.T.P!</h1>
        <h1>Player:<em> {this.state.players.player} </em></h1>
      </div>
    )
  }
}


export default App
