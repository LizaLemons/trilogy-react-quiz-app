
import React, { Component } from 'react';
import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';

import Home from './components/Home';
import Question from './components/Question';
import FinalScore from './components/FinalScore';
import NoMatch from './components/NoMatch';

class App extends Component {

  constructor(props){
    super(props);

    this.state = {
      questionArr: null,
      currentQuestion: 0,
      currentScore: 0
    }
  }

  /* don't let user navigate around */
  getRedirectPath = () => {
    if (this.state.currentQuestion === 0) {
      return "/";
    }
    return `/question/${this.state.currentQuestion}`;
  }

  /* checks if user answer is correct */
  crunchAnswer = (userSelectedAnswer, userSelectionArr) => {
    const correctAnswer = this.state.questionArr[this.state.currentQuestion - 1].correct;

    /* special for checkboxes: */
    if (Array.isArray(correctAnswer)) {
      /* stringify, then compare */
      if (JSON.stringify(correctAnswer) === JSON.stringify(userSelectionArr)) {
        this.correctScoreToast();
        this.increaseScore();
      } else {
        this.incorrectScoreToast();
      }
    } else if (correctAnswer === userSelectedAnswer) { /* everything else */
      this.correctScoreToast();
      this.increaseScore();
    } else {
      this.incorrectScoreToast();
    }
  }

  correctScoreToast = () => {
    window.Materialize.toast('Correct!', 2000);
  }

  incorrectScoreToast = () => {
    window.Materialize.toast("Sorry, that was incorrect.", 2000);
  }

  /* increments score */
  increaseScore = () => {
    this.setState({
      currentScore: this.state.currentScore + Math.round(100 / this.state.questionArrLength)
    });
  }

  /* increments currentQuestion */
  nextQuestionFxn = () => {
    this.setState({
      currentQuestion: this.state.currentQuestion + 1
    })
  }

  /* did user provide an answer at all? */
  checkAnswerAndNavigateFxn = (userSelectedAnswer, userSelectionArr) => {

    /* make sure they've answered before continuing */
    if ((userSelectedAnswer === null) && !userSelectionArr.length ) {
      window.Materialize.toast('Select an answer to proceed.', 2000);
    } else {
      this.crunchAnswer(userSelectedAnswer, userSelectionArr);
      this.nextQuestionFxn();
    }
  }

  /* fetch */
  componentDidMount() {
    fetch("https://s3.amazonaws.com/bcs-interview/questions.json")
    .then((resp) => resp.json())
    .then(
      (result) => {
        this.setState({
          questionArr: result.data.questions,
          questionArrLength: result.data.questions.length
        })
      }
    )
    .catch(function() {
      // if the server returns any errors
    });
  }

  /* gave Q route special key to ensure rerender */
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path='/'
            render={(props) => <Home {...props} nextQuestionFxn={this.nextQuestionFxn} currentQuestion={this.state.currentQuestion} />}
          />
          <Route path='/question/:num'
            render={(props) => parseInt(props.match.params.num, 10) === this.state.currentQuestion ?
              <Question
                {...props}
                checkAnswerAndNavigateFxn={this.checkAnswerAndNavigateFxn}
                currentQuestion={this.state.currentQuestion}
                questionArrLength={this.state.questionArrLength}
                questionArr={this.state.questionArr}
                key={props.match.params.num}
              />
              :
              <Redirect to={this.getRedirectPath()} />
            }
          />
          <Route path='/final-score'
            render={(props) => <FinalScore {...props} currentScore={this.state.currentScore} questionArrLength={this.state.questionArrLength} />}
          />
          <Route component={NoMatch}/>
        </Switch>
      </div>
    );
  }
}

export default App;
