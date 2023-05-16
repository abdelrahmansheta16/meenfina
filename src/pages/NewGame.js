import React from 'react'
import { useState, useEffect } from 'react';
import '../App.css'
import AddTask from '../components/AddTask';
import ShowTask from '../components/ShowTask';
import { useNavigate } from "react-router-dom"
import { useMutation, useQuery } from '@apollo/client';
import { NEW_GAME } from '../graphql/mutations';
import { useCookies } from 'react-cookie';
import { QUESTION } from '../graphql/queries';
import { useRef } from 'react';
import Randomstring from 'randomstring';


export const NewGame = () => {
    const [createGame] = useMutation(NEW_GAME);
    const [namesCookies, setnamesCookies, removenamesCookies] = useCookies(['name']);
    const [questions, setQuestions] = useState()
    const mounted = useRef(false);
    const [setCookie] = useCookies(['game']);
    const [setcCookie] = useCookies(['currentIndex']);
    const navigate = useNavigate()
    const [task, setTask] = useState("");
    const [tasklist, setTasklist] = useState(namesCookies.name || []);
    const [editid, setEditid] = useState(0);

    useQuery(QUESTION, {
        onCompleted(data) {
            console.log(data.questions)
            if (mounted) {
                setQuestions(data.questions)
            }
        },
        onError(data) {
            console.log(data)
        }
    });

    const handleSubmit = (event) => {
        event.preventDefault();

        if (editid) {
            const date = new Date();
            const selectedTask = tasklist.find(task => task.id === editid);
            const updateTask = tasklist.map((e) => (e.id === selectedTask.id ? (e = { id: e.id, name: task, time: `${date.toLocaleTimeString()} ${date.toLocaleDateString()}` }) : { id: e.id, name: e.name, time: e.time }));
            setTasklist(updateTask);
            setEditid(0);
            setTask("");
            return;
        }

        if (task) {
            const date = new Date();
            setTasklist([...tasklist, { id: date.getTime(), name: task, time: `${date.toLocaleTimeString()} ${date.toLocaleDateString()}` }]);
            setTask("");
        }

    }

    const handleEdit = (id) => {
        const selectedTask = tasklist.find(task => task.id === id);
        setTask(selectedTask.name);
        setEditid(id);
    }

    const handleDelete = (id) => {
        const updatedTasklist = tasklist.filter(task => task.id !== id);
        setTasklist(updatedTasklist);
    }

    useEffect(() => {
        setnamesCookies('name', tasklist, { path: '/' });
        return () => {
            removenamesCookies('name', { path: '/' })
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tasklist]);

    useEffect(() => {
        mounted.current = true;

        return () => {
            mounted.current = false;
        };
    }, []);

    const handleBack = () => {
        console.log("-----")
        return navigate("/group")
    }
    const handleStart = (event) => {
        event.preventDefault()
        const nameList = tasklist.map(a => a.name)
        let questionList = questions.map((a) => ({ selects: 0, question: a.question }))
        questionList = questionList.sort(function () { return Math.random() - 0.5 });
        questionList = questionList.slice(0, 2);
        console.log(questionList)
        createGame({
            variables: {
                names: nameList,
                questions: questionList
            },
            onCompleted(data) {
                console.log(data)
                const token = Randomstring.generate(10)
                const id = data.createGame.id
                setCookie('game', data.createGame, { path: '/' })
                setCookie('token', token, { path: '/' })
                setcCookie('currentIndex', 0, { path: '/' })
                return navigate(`/game/${id}`, { state: data.createGame })
            }
        })
    }

    return (
        <div className={"App "}>
            <div className="container">
                <AddTask handleSubmit={handleSubmit} editid={editid} task={task} setTask={setTask} />
                <ShowTask tasklist={tasklist} setTasklist={setTasklist} handleEdit={handleEdit} handleDelete={handleDelete} />
                <div>
                    <button onClick={handleBack}>Back</button>
                    <button onClick={handleStart}>Start</button>
                </div>
            </div>
        </div>

    )
}
