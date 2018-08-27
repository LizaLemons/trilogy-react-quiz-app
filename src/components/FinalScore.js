
import React from 'react';

const FinalScore = props => {
  const currentScore = props.currentScore
  const numQuestions = props.questionArrLength
  const eachWorth = 100 / numQuestions;
  const numCorrect = currentScore / eachWorth;
  const numWrong = numQuestions - numCorrect;

  return (
    <div>
      <p>
        Number of correct answers: {numCorrect}
      </p>
      <p>
        Number of wrong answers: {numWrong}
      </p>
      <p>
        Final Score: {props.currentScore}
      </p>
    </div>
  );
};

export default FinalScore;
