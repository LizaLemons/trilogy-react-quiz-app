
import React from 'react';
import { Input } from 'react-materialize';

const TextArea = props => (
  <div>
    <Input label="Type your answer here" type='textarea' onChange={(e) => props.handleTextChange(e)}/>
  </div>
);

export default TextArea;
