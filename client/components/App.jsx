import React from 'react'

class App extends React.Component {
  
  state = {
    players: []
  }

  componentDidMount() {
    console.log('component did mount')
    getWidgets()
      .then(players => {
        this.setState({
          players: player,
        })
      })
  }

  render () {
    console.log('render')
    return (
      <h1>React development has begun!</h1>
    )
  }
}


export default App
