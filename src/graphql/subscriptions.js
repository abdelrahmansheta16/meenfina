import { gql } from '@apollo/client'

export const SELECT_SUB = gql`
subscription SelectsUpdated($gameId: String!) {
  selectsUpdated(gameId: $gameId) {
    gameId
    selects
  }
}
`
export const ANSWERS_SUB = gql`
subscription AnswerUpdated($gameId: String!) {
  answerUpdated(gameId: $gameId) {
    answer
    gameId
    id
  }
}
`
export const NEXT_SUB = gql`
subscription NextUpdated($gameId: String!) {
  nextUpdated(gameId: $gameId) {
    id
    gameId
  }
}
`
export const PLAYERS_SUB = gql`
subscription PlayersUpdated($playersUpdatedGameId2: String!) {
  playersUpdated(gameId: $playersUpdatedGameId2) {
    gameId
    players {
      id
      name
    }
  }
}
`