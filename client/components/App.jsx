import React from 'react'
import Player from './Player'

class App extends React.Component {
  
  state = {
    players: []
  }

  componentDidMount() {
    console.log('component did mount')
    getWidgets()
      .then(player => {
        this.setState({
          players: player,
        })
      })
  }

  render () {
    console.log('render')
    return (
      <div>
        <h1>You're such a L.O.T.P!</h1>
        <Player key={player.id} data={player}/>
      </div>
    )
  }
}


export default App
