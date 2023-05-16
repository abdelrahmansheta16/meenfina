import logo from "../assets/logo.svg"
import mark from "../assets/page7/mark.svg"
import dot from "../assets/page7/dot.svg"
import createButton from "../assets/page9/createButton.svg"
import markr from "../assets/page7/markr.svg"
import { useState } from "react"

export const Name = () => {
    const images = importAll(require.context('../assets/avatars', false, /\.(png|jpe?g|svg)$/));
    const [imageBorders, setImageBorders] = useState(Array(8).fill('2px solid white'));

    const handleClick = (index) => {
        const updatedBorders = imageBorders.map((image) => ('2px solid white'));
        updatedBorders[index] = '4px solid black';
        setImageBorders(updatedBorders);
    };
    function importAll(r) {
        let images = {};
        r.keys().forEach((item, index) => { images[item.replace('./', '')] = r(item); });
        return images
    }
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
                            <input type="text" id="success" className="border-x-4 border-y-2 bg-white border-black text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 text-sm rounded-full focus:ring-green-500 focus:border-green-500 p-2.5 drop-shadow-lg" placeholder="Enter Your Name" style={{
                                "width": "100%", "borderColor": "rgb(254, 108, 86)"
                            }} />
                        </div>
                    </div>
                    <div className="flex justify-center flex-wrap px-6">
                        {Object.keys(images).map((imageName, index) => (
                            <img className="w-12 h-12 m-2 z-10 rounded-full" src={images[imageName]} alt="Bordered avatar" style={{ border: imageBorders[index] }}
                                onClick={() => handleClick(index)} />
                        ))}
                    </div>
                    <div className="flex justify-center">
                        <img src={createButton} alt="create button" className="z-10" style={{"width":"50%"}}/>
                    </div>
                </div>

                {/* <button onClick={handleJoin}>Join Game</button>
          <button onClick={handleNew}>New Game</button> */}
            </section>

        </main>
    )
}
