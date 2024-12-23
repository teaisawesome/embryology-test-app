'use client'

import Task from "@/components/Task";
import Result from "@/components/Result";
import { useEffect, useState } from "react";

export default function Home() {
  const [questions, setQuestions] = useState(null)

  const [currQuestionIndex, setCurrQuestionIndex] = useState(0)

  const [result, setResult] = useState([])

  const [finished, setFinisned] = useState(false)

  useEffect(() => {
    fetch('/source.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch source.json');
        }
        return response.json();
      })
      .then((data) => setQuestions(data))
      .catch((error) => console.error('Error fetching JSON:', error));
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
    <div className="flex flex-col justify-center items-center">
      {
        finished && questions && questions.data
        ? <Result questionParams={questions.data} results={result}/>
        : questions && questions.data ? 
        <>
          <Task
          key={currQuestionIndex}
          qData={questions.data[currQuestionIndex]}
          metaData={{
            currQuestionIndex,
            maxQuestionIndex: questions.data.length
          }}
          onNextTask={() => handleNextTask()}
          onFinishTask={() => handleFinishTask()}
          onTaskResult={handleTaskResult}/>
          <p>{currQuestionIndex + 1} / {questions.data.length} kérdés</p>
        </>
        : <p>Loading...</p>
      }
    </div>
  );
}
