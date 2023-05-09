import React from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { GAME } from '../graphql/queries';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import Randomstring from 'randomstring';
import { JOIN_PLAYER } from '../graphql/mutations';
export const JoinGame = () => {
    const [gameId, setGameId] = useState("")
    const [getGame, { loading, error, data }] = useLazyQuery(GAME);
    const navigate = useNavigate()
    const [cookies, setCookie, removeCookie] = useCookies(['game']);
    const [ccookies, setcCookie, removecCookie] = useCookies(['currentIndex']);

    const handleSubmit = (event) => {
        event.preventDefault()
        getGame({
            variables: { gameId },
            onCompleted(data) {
                console.log(data)
                const token = Randomstring.generate(10)
                const id = data.game.id
                setCookie('game', data.game, { path: '/' })
                setCookie('token', token, { path: '/' })
                setcCookie('currentIndex', 0, { path: '/' })
                return navigate(`/name`, { state: data.game })
            },
            onError(data) {
                console.log(data)
                return navigate("/")
            }
        })
    }
    return (
        <section className='addTask'>
            <form onSubmit={handleSubmit}>
                <input type="text" name="task" value={gameId} autoComplete="off" placeholder="Enter Code" maxLength="25" onChange={(e) => setGameId(e.target.value)} />
                <button type="submit">Join</button>
            </form>
        </section>
    )
}
