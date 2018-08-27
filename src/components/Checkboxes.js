
import React from 'react';
import { Input } from 'react-materialize';

function Checkboxes(props){
  return(
    <div>
      {props.answersArr.map((answerOption, i) => {
        return (
          <Input key={i} name='answers' type='checkbox' value={answerOption} label={answerOption} onChange={(e) => props.handleCheckboxChange(e, i)}/>
        )}
      )}
    </div>
  );
}

export default Checkboxes;
