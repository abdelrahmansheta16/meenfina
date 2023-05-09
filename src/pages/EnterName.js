import { useMutation } from '@apollo/client';
import { TextField } from '@mui/material'
import React, { useState } from 'react'
import { JOIN_PLAYER } from '../graphql/mutations';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

export const EnterName = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [acookies, setaCookie, removeaCookie] = useCookies(['token']);
    const [name, setName] = useState()
    const [joinPlayer, joinData] = useMutation(JOIN_PLAYER);

    const handleSubmit = () => {
        joinPlayer({
            variables: {
                userId: acookies.token,
                name,
                gameId: location.state.id
            },
            onCompleted(join) {
                navigate(`/game/${location.state.id}`, { state: location.state })
            }
        })
    }
    return (
        <div>
            <TextField id="outlined-basic" label="Outlined" variant="outlined" onChange={(e) => setName(e.target.value)} />
            <button onClick={handleSubmit}>Join</button>
        </div>
    )
}
