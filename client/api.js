import request from 'superagent'

const appUrl = 'http://localhost:3000/api/v1/game/'

export function getPlayers () {
    return request
      .get(appUrl)
      .then(response => response.body)
  }