import React from 'react'

const Player = props => {
    let randomIndex = Math.floor(Math.random()*16)
    
    return (
        <>
        <h1>Player:<em> {props.data[randomIndex]}</em></h1>
        </>
    )
}

export default Player