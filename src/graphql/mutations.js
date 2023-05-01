import { gql } from "@apollo/client";

export const NEW_GAME= gql`
mutation CreateGame($names: [String]!, $questions: [GameQuestionInput]!) {
  createGame(names: $names, questions: $questions) {
    id
    names
    questions {
      question
      selects
    }
  }
}
`
export const UPDATE_GAME = gql`
mutation UpdateSelects($gameId: String!, $questions: [GameQuestionInput]!, $selects: Int!) {
  updateSelects(gameId: $gameId, questions: $questions, selects: $selects) {
    id
    names
    questions {
      question
      selects
    }
  }
}
`
export const UPDATE_ANSWERS = gql`
mutation AnswerSelected($answerSelectedId: String!, $answer: String!) {
  answerSelected(id: $answerSelectedId, answer: $answer) {
    id
    answer
  }
}
`