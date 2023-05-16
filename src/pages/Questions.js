// import { useNavigate } from "react-router-dom"
import logo from "../assets/logo.svg"
import mark from "../assets/page6/mark.svg"
import nextButton from "../assets/page6/nextButton.svg"
import dot from "../assets/page6/dot.svg"
import markr from "../assets/page6/markr.svg"

export const Questions = () => {
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
                    <img src={mark} alt="" className="" />
                </div>
                <div className="w-210 absolute bottom-0 left-0">
                    <img src={dot} alt="" />
                </div>
                <div className="absolute top-0 right-0">
                    <img src={markr} alt="" className="h-screen" />
                </div>
                <div className="static flex flex-col justify-center h-full">
                    <div className="flex justify-center">
                        <img src={logo} alt="" className="w-639 h-374 max-w-sm p-10" />
                    </div>
                    <div className="flex justify-center">
                        <div className="px-2 py-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full">
                            <input type="text" id="success" className="border-x-4 border-y-2 bg-white border-black text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 text-sm rounded-full focus:ring-green-500 focus:border-green-500 p-2.5 drop-shadow-lg" placeholder="Success input" style={{
                                "width": 300, "borderColor": "rgb(254, 108, 86)"
                            }} />
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <img src={nextButton} alt="" className="w-639 h-374 max-w-sm p-10" />
                    </div>

                </div>

                {/* <button onClick={handleJoin}>Join Game</button>
          <button onClick={handleNew}>New Game</button> */}
            </section>

        </main>
    )
}
