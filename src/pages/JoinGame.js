import React from 'react'
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { GAME } from '../graphql/queries';
import { useLazyQuery } from '@apollo/client';
import Randomstring from 'randomstring';
export const JoinGame = () => {
    const [gameId, setGameId] = useState("")
    const [getGame] = useLazyQuery(GAME);
    const navigate = useNavigate()
    const [setCookie] = useCookies(['game']);
    const [setcCookie] = useCookies(['currentIndex']);

    const handleSubmit = (event) => {
        event.preventDefault()
        getGame({
            variables: { gameId },
            onCompleted(data) {
                console.log(data)
                const token = Randomstring.generate(10)
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
