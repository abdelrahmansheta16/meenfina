import { Box, Slider } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"
import { NEW_GAME } from '../graphql/mutations'
import { QUESTION } from '../graphql/queries'
import { useMutation, useQuery } from '@apollo/client'
import Randomstring from 'randomstring';
import { useCookies } from 'react-cookie'


export const Group = () => {
    const navigate = useNavigate()
    const [sliderValue, setSliderValue] = useState(3)
    const [questions, setQuestions] = useState()
    const [namesCookies, setnamesCookies, removenamesCookies] = useCookies(['name']);
    const [cookies, setCookie, removeCookie] = useCookies(['game']);
    const [ccookies, setcCookie, removecCookie] = useCookies(['currentIndex']);
    const [createGame, { data, loading, error }] = useMutation(NEW_GAME);
    const { loading1, error1, data1 } = useQuery(QUESTION, {
        onCompleted(data) {
            console.log(data.questions)
            setQuestions(data.questions)
        },
        onError(data) {
            console.log(data)
        }
    });

    const handleBack = () => {
        console.log("-----")
        return navigate("/")
    }
    const handleStart = (event) => {
        event.preventDefault()
        let questionList = questions.map((a) => ({ selects: 0, question: a.question }))
        questionList = questionList.sort(function () { return Math.random() - 0.5 });
        questionList = questionList.slice(0, 2);
        console.log(questionList)
        createGame({
            variables: {
                initialPlayers: sliderValue,
                questions: questionList
            },
            onCompleted(data) {
                console.log(data)
                const token = Randomstring.generate(10)
                const id = data.createGame.id
                setCookie('game', data.createGame, { path: '/' })
                setCookie('token', token, { path: '/' })
                setcCookie('currentIndex', 0, { path: '/' })
                return navigate(`/name`, { state: data.createGame })
            },
            onError(data) {
                console.log(data)
            }
        })
    }
    return (
        <div className='component'>
            <Box width={300}>
                <Slider
                    size="small"
                    defaultValue={3}
                    aria-label="Small"
                    valueLabelDisplay="auto"
                    max={10}
                    min={2}
                    onChange={(value) => setSliderValue(value.target.value)}
                />
            </Box>
            <div>
                <button onClick={handleBack}>Back</button>
                <button onClick={handleStart}>Next</button>
            </div>
        </div>
    )
}
