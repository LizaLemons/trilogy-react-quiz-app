
import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Home extends Component {
  render(){
    return(
      <div>
        Click below to begin the quiz!
        <br />
        <button><Link onClick={this.props.nextQuestionFxn} to={"/question/1"}>Begin</Link></button>
      </div>
    )
  }
}

export default Home;
