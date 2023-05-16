import { useNavigate } from "react-router-dom"
import logo from "../assets/logo.svg"
import letsplay from "../assets/page2/letsplay.svg"
import playbutton from "../assets/page2/playbutton.svg"
import mark from "../assets/page2/mark.svg"
import dot from "../assets/page2/dot.svg"
import markr from "../assets/page2/markr.svg"

export const Home = () => {
  const navigate = useNavigate()
  const handleJoin = () => {

    return navigate("/join")
  }
  // const handleNew = () => {
  //   return navigate("/group")
  // }
  return (
    <main>
      <section className="h-screen">
        <div className="absolute top-0 left-0">
          <img src={mark} alt="" className="w-3/4" />
        </div>
        <div className="w-210 absolute bottom-0 left-0">
          <img src={dot} alt="" />
        </div>
        <div className="w-210 absolute bottom-0 right-0">
          <img src={markr} alt="" />
        </div>
        <div className="static flex flex-col justify-center h-full">
          <div className="flex justify-center">
            <img src={logo} alt="" className="w-639 h-374 max-w-sm p-10" />
          </div>
          <div className="flex flex-row justify-center">
            <img src={playbutton} alt="" className="w-20 h-107 max-w-xs" />
            <img src={letsplay} alt="" className="cursor-pointer w-336 h-116 max-w-xs p-10" onClick={handleJoin} />
          </div>
        </div>

        {/* <button onClick={handleJoin}>Join Game</button>
          <button onClick={handleNew}>New Game</button> */}
      </section>

    </main>
  )
}
