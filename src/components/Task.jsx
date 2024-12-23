'use client'

import { useState } from "react"

export default function Task({qData, onNextTask, onFinishTask, onTaskResult, metaData}) {
    const {question, answers, rightAnswers} = qData

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
            <div className="flex flex-col items-center justify-center bg-teal-950 text-slate-50 w-3/6 p-3">
                <h1 className="mb-5 text-2xl">{question}</h1>
                <div className="grid grid-cols-1 gap-2">
                    { answers.map((answer, index) => (
                        <button
                            key={index + 1}
                            onClick={() => handleClick(index + 1)}
                            className={`border p-2 ${
                                submittedAnswers.includes(index + 1) ? 'bg-blue-500' : ''
                            }`}
                        >
                            {index + 1}. {answer}
                        </button>
                    )) }
                </div>
                {
                    currQuestionIndex < maxQuestionIndex - 1 
                    ? <button onClick={() => nextQuestion()} className="bg-blue-400 text-black rounded-md px-3 py-1 my-5">Tovább</button>
                    : <button onClick={() => finishQuestion()} className="bg-yellow-500 text-black rounded-md px-3 py-1 my-5">Befejez</button>
                }
            </div>
        </>
    )
}