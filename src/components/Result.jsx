import { useState } from "react"

export default function Result({ questionParams, results }) {
    //const {question, answers, rightAnswers} = questionParams
    // const {submittedAnswers, taskCompleted} = results
    const [currTaskIndex, setCurrTaskIndex] = useState(0)

    const answerLength = questionParams.length

    const completedTaskCount = results.filter((res) => {
        return res.taskCompleted === true
    })

    console.log(answerLength, completedTaskCount.length)
    
    return (
        <>
            <div className="flex flex-col items-center justify-center bg-teal-900 w-3/4 p-3">
                <h1 className="text-2xl my-2">Végeredmény { answerLength - completedTaskCount.length === 0 
                    ? <span className="text-3xl">🥳</span> 
                    : <span className="text-3xl">😰</span>}
                </h1>
                <div className="flex flex-row my-2">
                    <h2 className="mr-2"><b>Sikeres feladat:</b></h2>
                    <p className="text-green-400">{completedTaskCount.length}</p>
                </div>
                <div className="flex flex-row my-2">
                    <h2 className="mr-2"><b>Sikertelen feladat:</b></h2>
                    <p className="text-red-400">{answerLength - completedTaskCount.length}</p>
                </div>

                <div className="flex flex-col bg-teal-950 text-slate-50 rounded-md px-5 py-2">
                    <h1 className="text-xl mb-2">{questionParams[currTaskIndex].question}</h1>
                    <div className="flex flex-col">
                        {questionParams[currTaskIndex].answers.map((answer, index) => {
                            console.log("res", results)
                            return questionParams[currTaskIndex].rightAnswers.includes(index + 1) &&
                            results[currTaskIndex].submittedAnswers.includes(index + 1) ?
                            <p className="bg-green-700" key={index}>✅ {answer}</p> :
                                questionParams[currTaskIndex].rightAnswers.includes(index + 1) &&
                                !results[currTaskIndex].submittedAnswers.includes(index + 1) ?
                                <p className="bg-blue-700" key={index}>💤 {answer}</p> :
                                    !questionParams[currTaskIndex].rightAnswers.includes(index + 1) &&
                                    results[currTaskIndex].submittedAnswers.includes(index + 1) ?
                                    <p className="bg-red-700" key={index}>❌ {answer}</p> :
                                    <p key={index}>{answer}</p>
                        })}
                    </div>
                    <div className="flex flex-row mt-5">
                        <p className="pr-3">{currTaskIndex + 1} / {answerLength}</p>
                        {
                           currTaskIndex < answerLength -1 && <button onClick={() => setCurrTaskIndex((prevIndex) => prevIndex + 1)} className="rounded-md bg-teal-800 px-2 py-1">Következő feladat áttekintése</button>
                        }
                    </div>
                    
                </div>
            </div>

        </>
    )
}