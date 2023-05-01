import React from 'react'
import { useNavigate } from "react-router-dom"

export const Group = () => {
    const navigate = useNavigate()
    const handleBack = () => {
        console.log("-----")
        return navigate("/")
    }
    const handleNext = () => {
        console.log("-----")
        return navigate("/new")
    }
    return (
        <div className='component'>
            <span>Group of:</span>
            <div>
                <button>Girls</button>
                <button>Boys</button>
                <button>Mix</button>
            </div>
            <div>
                <button onClick={handleBack}>Back</button>
                <button onClick={handleNext}>Next</button>
            </div>
        </div>
    )
}
