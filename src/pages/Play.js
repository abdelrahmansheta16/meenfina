// import { useNavigate } from "react-router-dom"
import logo from "../assets/logo.svg"
import playbutton from "../assets/page3/playbutton.svg"
import mark from "../assets/page3/mark.svg"
import createRoom from "../assets/page3/createRoom.svg"
import joinRoom from "../assets/page3/joinRoom.svg"
import addButton from "../assets/page3/addbutton.svg"
import dot from "../assets/page3/dot.svg"
import markr from "../assets/page3/markr.svg"

export const Play = () => {
    // const navigate = useNavigate()
    // const handleJoin = () => {

    //     return navigate("/join")
    // }
    // const handleNew = () => {
    //     return navigate("/group")
    // }
    return (
        <main>
            <section className="h-screen">
                <div className="absolute top-0 left-0">
                    <img src={mark} alt="" className="h-screen" />
                </div>
                <div className="w-210 absolute bottom-0 right-0">
                    <img src={dot} alt="" />
                </div>
                <div className="w-210 absolute top-0 right-0">
                    <img src={markr} alt="" />
                </div>
                <div className="static flex flex-col justify-center h-full">
                    <div className="flex justify-center">
                        <img src={logo} alt="" className="w-639 h-374 max-w-sm p-10" />
                    </div>
                    <div className="flex flex-row justify-center">
                        <img src={playbutton} alt="" className="p-6 max-w-xs" style={{ "width": 137 }} />
                        <img src={createRoom} alt="" className="h-107 p-6 max-w-xs" />
                    </div>
                    <div className="flex flex-row justify-center">
                        <img src={addButton} alt="" className="h-107 p-6 max-w-xs" />
                        <img src={joinRoom} alt="" className="h-107 p-6 max-w-xs" />
                    </div>

                </div>

                {/* <button onClick={handleJoin}>Join Game</button>
          <button onClick={handleNew}>New Game</button> */}
            </section>

        </main>
    )
}
