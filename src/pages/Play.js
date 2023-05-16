import { useNavigate } from "react-router-dom"
import logo from "../assets/logo.svg"
import playbutton from "../assets/page3/playbutton.svg"
import mark from "../assets/page3/mark.svg"
import createRoom from "../assets/page3/createRoom.svg"
import joinRoom from "../assets/page3/joinRoom.svg"
import addButton from "../assets/page3/addbutton.svg"
import dot from "../assets/page3/dot.svg"
import markr from "../assets/page3/markr.svg"

export const Play = () => {
    const navigate = useNavigate()
    const handleJoin = () => {

        return navigate("/join")
    }
    const handleNew = () => {
        return navigate("/questions")
    }
    return (
        <main>
            <section className="h-screen">
                <div>
                    <img src={mark} alt="" className="absolute left-0" style={{ "width": "40%", "height":"100%" }} />
                </div>
                <div >
                    <img src={dot} alt="" className="absolute bottom-0 right-0" style={{ "width": "20%" }} />
                </div>
                <div>
                    <img src={markr} alt="" className="absolute top-0 right-0" style={{ "width": "20%" }} />
                </div>
                <div className="static flex flex-col justify-center h-full">
                    <div className="flex justify-center">
                        <img src={logo} alt="" className="z-10 max-w-sm mb-4" style={{ "width": "70%" }} />
                    </div>
                    <div className="flex flex-row justify-center mb-4">
                        <img src={playbutton} alt="" className="mr-4 z-10" style={{ "width": "15%" }} />
                        <img src={createRoom} alt="" className="z-10" style={{ "width": "40%" }} onClick={handleNew}/>
                    </div>
                    <div className="flex flex-row justify-center">
                        <img src={addButton} alt="" className="mr-4 z-10 max-w-xs" style={{ "width": "15%" }} />
                        <img src={joinRoom} alt="" className="z-10 max-w-xs" style={{ "width": "40%" }} onClick={handleJoin}/>
                    </div>

                </div>

                {/* <button onClick={handleJoin}>Join Game</button>
          <button onClick={handleNew}>New Game</button> */}
            </section>

        </main>
    )
}
