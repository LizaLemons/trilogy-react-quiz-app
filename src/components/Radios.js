
import React from 'react';
import { Input } from 'react-materialize';

const Radios = props => (
  <div>
    {props.answersArr.map((answerOp, i) => {
      return (
        <Input key={`${answerOp}${i}`} name={`question-${props.currentQuestion}`} type="radio" value={answerOp} label={answerOp} className="with-gap" checked={props.userAnswer === i} onChange={(e) => props.handleRadioChange(e, i)} />
      )}
    )}
  </div>
);

export default Radios;
