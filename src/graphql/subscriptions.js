import { gql } from '@apollo/client'

export const SELECT_SUB = gql`
subscription OnSelectsUpdated {
    selectsUpdated {
      gameId
      selects
    }
  }
`
export const ANSWERS_SUB = gql`
subscription AnswerUpdated {
  answerUpdated {
    answer
    id
  }
}
`