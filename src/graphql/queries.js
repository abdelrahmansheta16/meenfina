import { gql } from "@apollo/client";

export const GAME = gql`
query Game($gameId: ID!) {
  game(id: $gameId) {
    id
    initialPlayers
    players {
      id
      name
    }
    questions {
      question
      selects
    }
  }
}
`
export const QUESTION = gql`
query Questions {
  questions {
    id
    question
  }
}
`