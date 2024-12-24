'use client'

import { useState } from "react"
import Image from 'next/image'

export default function Task({qData, onNextTask, onFinishTask, onTaskResult, metaData}) {
    const {question, answers, rightAnswers, image} = qData

    const {currQuestionIndex, maxQuestionIndex} = metaData

    const [submittedAnswers, setSubmittedAnswers] = useState([])

    const handleClick = function(index) {
        if (submittedAnswers.includes(index)) {
            setSubmittedAnswers(submittedAnswers.filter((subAnswer) => {
                return subAnswer !== index
            }))
        } else {
            const currSubmittedAnswers = [...submittedAnswers]
            currSubmittedAnswers.push(index)

            setSubmittedAnswers(currSubmittedAnswers)
        }
    }

    const calculateTaskResult = function() {
        let taskCompleted = false

        const a = rightAnswers.toSorted()
        const b = submittedAnswers.toSorted()

        if(JSON.stringify(a) === JSON.stringify(b)) {
            taskCompleted = true
        }

        console.log(submittedAnswers, "SUBMITTED")

        onTaskResult({
            submittedAnswers,
            taskCompleted
        })
    }

    const nextQuestion = function() {
        calculateTaskResult()
        onNextTask()
    }

    const finishQuestion = function() {
        calculateTaskResult()
        onFinishTask()
    }

    return (
        <>
            <div className="flex flex-col items-center justify-center w-full bg-teal-900 text-slate-50 md:w-3/6 p-3 m-0">
                <h1 className="mb-5 text-2xl text-center">{question}</h1>
                <div className="grid grid-cols-1 gap-2">
                    { image && <Image className="rounded-sm" src={`/img/${image}`} width={150} height={150} alt={image}/> }
                    { answers.map((answer, index) => (
                        <button
                            key={index + 1}
                            onClick={() => handleClick(index + 1)}
                            className={`border p-2 rounded-sm text-left ${
                                submittedAnswers.includes(index + 1) ? 'bg-blue-700' : ''
                            }`}
                        >
                            {index + 1}. {answer}
                        </button>
                    )) }
                </div>
                {
                    currQuestionIndex < maxQuestionIndex - 1 
                    ? <button onClick={() => nextQuestion()} className="bg-blue-400 w-full text-black rounded-md px-3 py-2 my-5">Tovább</button>
                    : <button onClick={() => finishQuestion()} className="bg-yellow-500 w-full text-black rounded-md px-3 py-2 my-5">Befejez</button>
                }
            </div>
        </>
    )
}