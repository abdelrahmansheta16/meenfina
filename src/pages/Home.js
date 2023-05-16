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
        <div >
          <img src={mark} alt="" className="absolute top-0 left-0" style={{ "width": "20%" }} />
        </div>
        <div>
          <img src={dot} alt="" className="absolute bottom-0 left-0" style={{ "width": "20%" }} />
        </div>
        <div>
          <img src={markr} alt="" className="absolute bottom-0 right-0" style={{ "width": "20%" }} />
        </div>
        <div className="static flex flex-col justify-center h-full">
          <div className="flex justify-center">
            <img src={logo} alt="" className="max-w-sm p-10" style={{ "width": "40%" }} />
          </div>
          <div className="flex flex-row justify-center">
            <img src={playbutton} alt="" className="max-w-xs" style={{ "width": "10%" }} />
            <img src={letsplay} alt="" className="cursor-pointer max-w-xs p-10" style={{ "width": "40%" }} onClick={handleJoin} />
          </div>
        </div>

        {/* <button onClick={handleJoin}>Join Game</button>
          <button onClick={handleNew}>New Game</button> */}
      </section>

    </main>
  )
}
