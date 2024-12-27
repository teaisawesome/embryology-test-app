'use client'

import Task from "@/components/Task";
import Result from "@/components/Result";
import { useEffect, useState } from "react";

export default function Home() {
  const [questions, setQuestions] = useState(null)

  const [currQuestionIndex, setCurrQuestionIndex] = useState(0)

  const [result, setResult] = useState([])

  const [finished, setFinisned] = useState(false)

  const getRandomQuestions = (array, num) => {
    const shuffled = [...array].sort(() => 0.5 - Math.random())
    return shuffled.slice(0, num)
  }

  useEffect(() => {
    fetch('/source.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch source.json');
        }
        return response.json()
      })
      .then((source) => {
        const randomQuestions = getRandomQuestions(source.data, 10)
        setQuestions(randomQuestions)
      })
      .catch((error) => console.error('Error fetching JSON:', error))
  }, [])

  const handleNextTask = () => {
    setCurrQuestionIndex((prevIndex) => prevIndex + 1);
  }

  const handleFinishTask = () => {
    setFinisned(true)
  }

  const handleTaskResult = function(currTaskResult) {
    setResult((prevResult) => [...prevResult, currTaskResult])
  }

  return (
    <div className="flex flex-col items-center bg-teal-900 h-screen">
      {
        finished && questions
        ? <Result questionParams={questions} results={result}/>
        : questions ? 
        <>
          <Task
          key={currQuestionIndex}
          qData={questions[currQuestionIndex]}
          metaData={{
            currQuestionIndex,
            maxQuestionIndex: questions.length
          }}
          onNextTask={() => handleNextTask()}
          onFinishTask={() => handleFinishTask()}
          onTaskResult={handleTaskResult}/>
          <p>{currQuestionIndex + 1} / {questions.length} kérdés</p>
        </>
        : <p>Loading...</p>
      }
    </div>
  );
}
