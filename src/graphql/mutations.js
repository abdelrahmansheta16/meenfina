import { gql } from "@apollo/client";

export const NEW_GAME= gql`
mutation CreateGame($questions: [GameQuestionInput]!, $initialPlayers: Int) {
  createGame(questions: $questions, initialPlayers: $initialPlayers) {
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
export const UPDATE_GAME = gql`
mutation UpdateSelects($gameId: String!, $questions: [GameQuestionInput]!, $selects: Int!) {
  updateSelects(gameId: $gameId, questions: $questions, selects: $selects) {
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
export const UPDATE_ANSWERS = gql`
mutation AnswerSelected($answerSelectedId: String!, $answer: String!) {
  answerSelected(id: $answerSelectedId, answer: $answer) {
    answer
    id
  }
}
`
export const UPDATE_NEXTS = gql`
mutation NextSelected($nextSelectedId: String!) {
  nextSelected(id: $nextSelectedId)
}
`
export const EXIT_PLAYER = gql`
mutation ExitGame($userId: String!, $gameId: String!) {
  exitGame(userId: $userId, gameId: $gameId) {
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
export const JOIN_PLAYER = gql`
mutation JoinGame($userId: String!, $name: String!, $gameId: String!) {
  joinGame(userId: $userId, name: $name, gameId: $gameId) {
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