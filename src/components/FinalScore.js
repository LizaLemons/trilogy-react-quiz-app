
import React, {Component} from 'react';

class FinalScore extends Component {
  constructor(props){
    super(props);

    let currentScore = this.props.currentScore
    let numQuestions = this.props.questionArrLength
    let eachWorth = 100 / numQuestions;
    let numCorrect = currentScore / eachWorth;
    let numWrong = numQuestions - numCorrect;

    this.state = {
      numCorrect: numCorrect,
      numWrong: numWrong
    }
  }

  render(){
    return(
      <div>
        <p>
          Number of correct answers: {this.state.numCorrect}
        </p>
        <p>
          Number of wrong answers: {this.state.numWrong}
        </p>
        <p>
          Final Score: {this.props.currentScore}
        </p>
      </div>
    )
  }
}

export default FinalScore;
