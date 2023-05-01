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
import { ANSWERS_SUB, ANSWER_SUB, SELECT_SUB } from '../graphql/subscriptions';
import { UPDATE_ANSWER, UPDATE_ANSWERS, UPDATE_GAME } from '../graphql/mutations';
import CopyToClipboard from 'react-copy-to-clipboard';
import { toast } from 'react-toastify';

export const Game = () => {
    const [game, setGame] = useState({})
    const [isDone, setIsDone] = useState(false)
    const [updateGame, { data1, loading1, error1 }] = useMutation(UPDATE_GAME);
    const [answerList, setAnswerlist] = useState(JSON.parse(localStorage.getItem('answerList')) || []);
    const [cookies, setCookie, removeCookie] = useCookies(['game']);
    const [acookies, setaCookie, removeaCookie] = useCookies(['token']);
    const [updateAnswers, { adata, aloading, aerror }] = useMutation(UPDATE_ANSWERS);
    const [scookies, setsCookie, removesCookie] = useCookies(['selects']);
    const [ccookies, setcCookie, removecCookie] = useCookies(['currentIndex']);
    const [currentQuestion, setCurrentQuestion] = useState(cookies.game.questions[ccookies.currentIndex].question || "")
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
                onError(data){console.log(data)}
            })
        }
        setAlignment(newAlignment);
    };
    const { subscribeToMore, ...result } = useQuery(GAME, {
        variables: {
            gameId: cookies.game.id
        },
        onCompleted(data) {
            if (mounted) {
                setGame(data.game)
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
                (data.data.data.selectsUpdated.selects == game.names.length && data.data.data.selectsUpdated.gameId == cookies.game.id)
            ) {
                console.log("hello")
                const newIndex = +ccookies.currentIndex + 1
                console.log("5", newIndex)
                if (newIndex < game.questions.length){
                    setcCookie('currentIndex', newIndex, { path: '/' })
                }
                setIsDone(true)
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
    const handleNext = () => {
        const newIndex = +ccookies.currentIndex
        console.log(game.questions[newIndex])
        if(+scookies.selects === game.names.length){
            setsCookie('selects', 0, { path: '/' })
        }
        localStorage.removeItem('answerList')
        setCurrentQuestion(game.questions[newIndex].question)
        setIsDone(false)
        setAlignment(null)
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
    return (
        <div className='game'>
            {
                !result.loading ? <>
                    <span>{currentQuestion}</span>
                    <ToggleButtonGroup
                        color="primary"
                        value={alignment}
                        exclusive
                        onChange={handleChange}
                        aria-label="Platform"
                        orientation='vertical'
                    >

                        {cookies.game.names.map((name) => (
                            <ToggleButton key={name} value={name} >{name}</ToggleButton>
                        ))}
                    </ToggleButtonGroup>
                    <CopyToClipboard text={cookies.game.id}
                        onCopy={() => {
                            if (isMobile) {
                                toast("copied to clipboard")
                            } else {
                                alert("copied to clipboard")
                            }
                        }}>
                        <span>Copy</span>
                    </CopyToClipboard>
                    {isDone ? <Button variant="contained" onClick={handleNext}>Next</Button> : null}
                </> : <Box sx={{ display: 'flex' }}>
                    <CircularProgress />
                </Box>
            }
        </div>
    );
}