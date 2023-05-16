import { useNavigate } from "react-router-dom"
import logo from "../assets/logo.svg"
import mark from "../assets/page7/mark.svg"
import nextButton from "../assets/page7/nextButton.svg"
import backButton from "../assets/page7/backButton.svg"
import girlsButton from "../assets/page7/girlsButton.svg"
import boysButton from "../assets/page7/boysButton.svg"
import mixButton from "../assets/page7/mixButton.svg"
import dot from "../assets/page7/dot.svg"
import markr from "../assets/page7/markr.svg"
import { useState } from "react"

export const Group2 = () => {
    const navigate = useNavigate()
    const [inputValue,setInputValue] = useState("")
    const handleNext = () => {
        return navigate("/groupName")
    }
    const handleBack = () => {
        return navigate(-1)
    }
    const handleChange = (event) => {
        event.preventDefault()
        setInputValue(event.target.value);
    };
    return (
        <main>
            <section className="h-screen">
                <div >
                    <img src={mark} alt="" className="absolute top-0 left-0" style={{ "width": "40%" }} />
                </div>
                <div >
                    <img src={dot} alt="" className="absolute bottom-0 left-0" style={{ "width": "35%" }} />
                </div>
                <div>
                    <img src={markr} alt="" className="absolute bottom-0 top-0 right-0" style={{ "height": "100%", "width": "35%" }} />
                </div>
                <div className="static flex flex-col justify-evenly h-full">
                    <div className="flex justify-center">
                        <img src={logo} alt="" className="z-10 max-w-sm" style={{ "width": "70%" }} />
                    </div>
                    <div className="flex justify-center">
                        <div className="z-10 px-2 py-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full" style={{ "width": "70%" }}>
                            <input type="text" id="success" className="border-x-4 border-y-2 bg-white border-black text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 text-sm rounded-full focus:ring-green-500 focus:border-green-500 p-2.5 drop-shadow-lg" placeholder="Group of:" value={inputValue} onChange={handleChange} style={{
                                "width": "100%", "borderColor": "rgb(254, 108, 86)"
                            }} />
                        </div>
                    </div>
                    <div className="flex flex-row justify-evenly">
                        <img src={boysButton} alt="" className="z-10 max-w-sm" style={{ "width": "20%" }} onClick={()=>setInputValue("Boys")} />
                        <img src={girlsButton} alt="" className="z-10 max-w-sm" style={{ "width": "20%" }} onClick={() => setInputValue("Girls")} />
                        <img src={mixButton} alt="" className="z-10 max-w-sm" style={{ "width": "20%" }} onClick={() => setInputValue("Mix")} />
                    </div>
                    <div className="flex flex-row justify-evenly">
                        <img src={backButton} alt="" className="z-10 max-w-sm" style={{ "width": "20%" }} onClick={handleBack} />
                        <img src={nextButton} alt="" className="z-10 max-w-sm" style={{ "width": "20%" }} onClick={handleNext} />
                    </div>

                </div>

                {/* <button onClick={handleJoin}>Join Game</button>
          <button onClick={handleNew}>New Game</button> */}
            </section>

        </main>
    )
}
