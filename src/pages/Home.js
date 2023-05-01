import { useNavigate } from "react-router-dom"

export const Home = () => {
  const navigate = useNavigate()
  const handleJoin = () => {

    return navigate("/join")
  }
  const handleNew = () => {
    return navigate("/group")
  }
  return (
    <main>
      <div className="component">
        <button onClick={handleJoin}>Join Game</button>
        <button onClick={handleNew}>New Game</button>
      </div>
    </main>
  )
}
