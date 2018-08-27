
import React from 'react';
import {Link} from 'react-router-dom';

const Home = props => (
  <div>
    Click below to begin the quiz
    <br />
    <button><Link onClick={props.nextQuestionFxn} to={"/question/1"}>Begin</Link></button>
  </div>
);

export default Home;
