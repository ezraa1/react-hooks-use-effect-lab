import React, { useState, useEffect } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  // add useEffect code

  useEffect(() => {
    if (timeRemaining === 0) {
      setTimeRemaining(10);
      onAnswered(false);
      return; 
    }

    //  a timeout to run after 1 second
    const timerId = setTimeout(() => {
      // decreasing the time remaining
      setTimeRemaining((timeRemaining) => timeRemaining - 1);
    }, 1000);

    // a clean up function to clean up after the timeout function
    return function () {
      clearTimeout(timerId);
    };
  }, [timeRemaining, onAnswered]);


  function handleCorrectAnswer(isCorrect) {
    setTimeRemaining(10);
    onAnswered(isCorrect);
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleCorrectAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
