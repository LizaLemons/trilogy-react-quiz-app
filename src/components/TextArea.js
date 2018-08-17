
import React from 'react';
import { Input } from 'react-materialize';

function TextArea(props){
  return(
    <div>
      <Input label="Type your answer here" type='textarea' onChange={(e) => props.handleTextChange(e)}/>
    </div>
  );
}

export default TextArea;
