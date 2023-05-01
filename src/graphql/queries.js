import { gql } from "@apollo/client";

export const GAME = gql`
query Game($gameId: ID!) {
  game(id: $gameId) {
    id
    names
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