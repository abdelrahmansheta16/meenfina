import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import '../data/data'
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';
import { useMutation, useQuery, useSubscription } from '@apollo/client';
import { GAME } from '../graphql/queries';
import { useState } from 'react';
import { useEffect } from 'react';
import { useLayoutEffect } from 'react';
import { useRef } from 'react';
import { Box, Button, CircularProgress } from '@mui/material';
import { get, useCookies } from 'react-cookie'
import { ANSWERS_SUB, ANSWER_SUB, NEXT_SUB, PLAYERS_SUB, SELECT_SUB } from '../graphql/subscriptions';
import { EXIT_PLAYER, JOIN_PLAYER, UPDATE_ANSWER, UPDATE_ANSWERS, UPDATE_GAME, UPDATE_NEXTS } from '../graphql/mutations';
import CopyToClipboard from 'react-copy-to-clipboard';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';

export const Game = ({ data }) => {
    const location = useLocation()
    const navigate = useNavigate()
    const [game, setGame] = useState({})
    const [gameStarted, setGameStarted] = useState()
    const [status, setStatus] = useState(null)
    const [updateGame, { data1, loading1, error1 }] = useMutation(UPDATE_GAME);
    const [exitPlayer, exitData] = useMutation(EXIT_PLAYER);
    const [answerList, setAnswerlist] = useState(JSON.parse(localStorage.getItem('answerList')) || []);
    const [nextList, setNextList] = useState(JSON.parse(localStorage.getItem('nextList')) || []);
    const [cookies, setCookie, removeCookie] = useCookies(['game']);
    const [acookies, setaCookie, removeaCookie] = useCookies(['token']);
    const [updateAnswers, { adata, aloading, aerror }] = useMutation(UPDATE_ANSWERS);
    const [updateNexts, nextData] = useMutation(UPDATE_NEXTS);
    const [scookies, setsCookie, removesCookie] = useCookies(['selects']);
    const [ccookies, setcCookie, removecCookie] = useCookies(['currentIndex']);
    const [currentQuestion, setCurrentQuestion] = useState(location.state.questions[0].question || "")
    const [players, setPlayers] = useState(location.state.players || [])
    const mounted = useRef(false);
    const [alignment, setAlignment] = useState(null);
    const handleChange = (event, newAlignment) => {
        console.log(game)
        console.log(acookies.token)
        updateAnswers({
            variables: {
                answerSelectedId: acookies.token,
                answer: newAlignment
            },
            onError(data) {
                console.log(data)
            }
        })
        const updatedQuestions = cookies.game.questions.map((question, index) => {
            if (index == ccookies.currentIndex) {
                console.log("1", scookies.selects)
                scookies.selects++
                console.log("2", scookies.selects)
            }
            return { question: question.question, selects: +scookies.selects }
        }
        )
        console.log(updatedQuestions)
        if (alignment === null) {
            console.log("fa")
            updateGame({
                variables: {
                    gameId: cookies.game.id,
                    questions: updatedQuestions,
                    selects: scookies.selects
                },
                onCompleted(data) {
                    console.log("update completed")
                },
                onError(data) { console.log(data) }
            })
        }
        setAlignment(newAlignment);
    };
    const { subscribeToMore, ...result } = useQuery(GAME, {
        variables: {
            gameId: location.state.id
        },
        onCompleted(data) {
            if (mounted) {
                if (data.game.players.length === data.game.initialPlayers) {
                    setGameStarted(true)
                    setGame(data.game)
                    setPlayers(data.game.players)
                }
            }
        },
        onError(data) {
            console.log(data)
        }
    });
    // subscribeToMore({
    //     document: SELECT_SUB,
    //     updateQuery: (prev, { subscriptionData }) => {
    //         if (!subscriptionData.data) return prev;
    //         const newFeedItem = subscriptionData.data.selectsUpdated;
    //         console.log("hello")
    //         if (
    //             (newFeedItem.selects == game.names.length && newFeedItem.gameId == cookies.game.id)
    //         ) {
    //             currentIndex.current++
    //             setCurrentQuestion(game.questions[currentIndex.current])
    //         }
    //     }
    // })
    useSubscription(SELECT_SUB, {

        onData: (data) => {
            console.log(game.names.length)
            console.log(cookies.game.id)
            console.log(data.data.data.selectsUpdated)
            console.log("3", scookies.selects)
            setsCookie('selects', data.data.data.selectsUpdated.selects, { path: '/' });
            console.log("4", scookies.selects)
            if (
                (data.data.data.selectsUpdated.selects == players.length && data.data.data.selectsUpdated.gameId == cookies.game.id)
            ) {
                console.log("hello")
                const newIndex = +ccookies.currentIndex + 1
                console.log("5", newIndex)
                if (newIndex < game.questions.length) {
                    setcCookie('currentIndex', newIndex, { path: '/' })
                    setAnswerlist([])
                    setStatus("next")
                } else {
                    setStatus("finish")
                    removeCookie('game')
                    removeaCookie('token')
                    removecCookie('currentIndex')
                    removesCookie('selects')
                }
                // const votes = answerList.filter(item => item.answer === name);
                // setCurrentQuestion(game.questions[newIndex].question)
            }
        },
        onError: (data) => {
            console.log("error")
            console.log(data)
        },
        onComplete: (data) => {
            console.log(data)
        }
    })
    useSubscription(ANSWERS_SUB, {

        onData: (data) => {
            console.log("wasal")
            console.log(data.data.data.answerUpdated)
            let isNew = true;
            const updatedList = answerList.map((answer) => {
                console.log(answer)
                if (answer.id == data.data.data.answerUpdated.id) {
                    answer.answer = data.data.data.answerUpdated.answer
                    isNew = false
                }
                return answer
            })
            if (isNew) {
                setAnswerlist([...answerList, { id: data.data.data.answerUpdated.id, answer: data.data.data.answerUpdated.answer }])
            }
            else {
                setAnswerlist(updatedList)
            }
        },
        onError: (data) => {
            console.log("error")
            console.log(data)
        },
        onComplete: (data) => {
            console.log(data)
        }
    })
    useSubscription(NEXT_SUB, {

        onData: (data) => {
            console.log(data)
            const nextId = data.data.data.nextUpdated
            console.log(nextId)
            let isNew = true;
            console.log(nextList)
            const updatedList = nextList.map((next) => {
                console.log(next)
                if (next.id == nextId) {
                    isNew = false
                }
                return { id: next.id }
            })
            console.log(updatedList)
            console.log(isNew)
            if (isNew) {
                setNextList(current => [...current, { id: nextId }])
            }
            else {
                setNextList(updatedList)
            }
            console.log(nextList)
            console.log(location.state.names.length)

        },
        onError: (data) => {
            console.log("error")
            console.log(data)
        },
        onComplete: (data) => {
            console.log(data)
        }
    })
    useSubscription(PLAYERS_SUB, {

        onData: (data) => {
            console.log(data.data.data.playersUpdated)
            setPlayers(data.data.data.playersUpdated)
            if(!gameStarted && data.data.data.playersUpdated.length === location.state.initialPlayers){
                setGameStarted(true)
            }
        },
        onError: (data) => {
            console.log("error")
            console.log(data)
        },
        onComplete: (data) => {
            console.log(data)
        }
    })
    const handleExit = () => {
        exitPlayer({
            variables: {
                userId: acookies.token,
                gameId: location.state.id
            },
            onCompleted(exit) {
                console.log(exit)
                navigate('/')

            },
            onError(data){
                console.log(data)
            }
        })
    }
    const handleStatus = () => {
        if (status === "next") {
            updateNexts({
                variables: {
                    nextSelectedId: acookies.token
                },
                onCompleted(data) {
                    console.log(data)
                }
            })
        } else if (status === "finish") {
            navigate('/')
        }

        // const newIndex = +ccookies.currentIndex
        // console.log(game.questions[newIndex])
        // if (+scookies.selects === game.names.length) {
        //     setsCookie('selects', 0, { path: '/' })
        // }
        // if (status === "next") {
        //     setCurrentQuestion(game.questions[newIndex].question)
        // }
        // if (status === "finish") {
        //     navigate('/')
        // }
        // setStatus(null)
        // setAlignment(null)
    }
    useEffect(() => {
        mounted.current = true;

        return () => {
            mounted.current = false;
        };
    }, []);
    useEffect(() => {
        setsCookie('selects', 0, { path: '/' });
        return () => {
            removesCookie('selects', { path: '/' })
        };
    }, []);
    useEffect(() => {
        localStorage.setItem('answerList', JSON.stringify(answerList));
        return () => {
            localStorage.removeItem('answerList')
        };
    }, [answerList]);
    useEffect(() => {
        localStorage.setItem('nextList', JSON.stringify(nextList));
        if (nextList.length === players.length) {
            const newIndex = +ccookies.currentIndex
            if (+scookies.selects === players.length) {
                setsCookie('selects', 0, { path: '/' })
            }
            if (status === "next") {
                setCurrentQuestion(game.questions[newIndex].question)
            }
            setStatus(null)
            setAlignment(null)
        }
        return () => {
            localStorage.removeItem('nextList')
        };
    }, [nextList]);
    return (
        <div className='game'>
            {
                // TODO change names to initial num of players
                // map players instead of names
                gameStarted ? <>
                    <span>{currentQuestion}</span>
                    <ToggleButtonGroup
                        color="primary"
                        value={alignment}
                        exclusive
                        onChange={handleChange}
                        aria-label="Platform"
                        orientation='vertical'
                    >

                        {players.map((player) => (
                            <ToggleButton key={player.id} value={player.name} >{player.name}</ToggleButton>
                        ))}
                    </ToggleButtonGroup>
                    <CopyToClipboard text={location.state.id}
                        onCopy={() => {
                            if (isMobile) {
                                toast("copied to clipboard")
                            } else {
                                alert("copied to clipboard")
                            }
                        }}>
                        <span>Copy</span>
                    </CopyToClipboard>
                    <button onClick={handleExit}>Exit</button>
                    {status ? <Button variant="contained" onClick={handleStatus}>{status === "next" ? "Next" : "finish"}</Button> : null}
                </> : <Box sx={{ display: 'flex' }}>
                    <CircularProgress />
                </Box>
            }
        </div>
    );
}