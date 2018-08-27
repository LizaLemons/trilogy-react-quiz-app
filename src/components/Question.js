
import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { ProgressBar } from 'react-materialize';

import Radios from './Radios';
import MySelect from './MySelect';
import TextArea from './TextArea';
import Checkboxes from './Checkboxes';

class Question extends Component {
  constructor(props){
    super(props);

    this.state = {
      userAnswer: null,
      userSelectionArr: []
    }
  }

  /* Button link: where should we navigate to next? */
  generateToLink = () => {
    if (this.props.currentQuestion < this.props.questionArrLength) {
      return `/question/${this.props.currentQuestion + 1}`
    }
    return "/final-score";
  }

  /* Same btn, different text */
  generateBtnText = () => {
    if (this.props.currentQuestion < this.props.questionArrLength) {
      return "Next";
    }
    return "Finish";
  }

  /* while we wait for fetch... */
  renderLoader(){
    return(
      <div>Loading...</div>
    )
  }

  /* update state  */
  updateUserAnswer = (updatedUserAnswer) => {
    this.setState({
      userAnswer: updatedUserAnswer
    });
  }

  /* update userAnswer with INDEX of answer (not the answer) */
  handleRadioChange = (e, i) => {
    if (e.target.checked) {
      let updatedUserAnswer = i;
      this.updateUserAnswer(updatedUserAnswer);
    }
  }

  /* dropdowns */
  handleSelectChange = (e) => {
    /* get the indexOf selected answer */
    let answersArr = this.props.questionArr[this.props.currentQuestion - 1].answer;
    let userSelectedAnswer = e.target.value;
    let indexOfUserSelectedAnswer = answersArr.indexOf(userSelectedAnswer);

    /* update userAnswer w/ the index */
    /* wasn't updating if user chose '0' bc 0 is falsey */
     if (indexOfUserSelectedAnswer >= 0) {
      let updatedUserAnswer = indexOfUserSelectedAnswer;
      this.updateUserAnswer(updatedUserAnswer);
    }
  }

  /* update userAnswer with actual answer */
  handleTextChange = (e) => {
    /* if user typed something */
    if (e.target.value) {
      let updatedUserAnswer = e.target.value;
      this.updateUserAnswer(updatedUserAnswer);
    }
  }

  /* update userSelectionArr with array */
  handleCheckboxChange = (e, i) => {
    /* copy the arr so that we don't manipulate state directly */
    let userSelectionArr = [].concat(this.state.userSelectionArr);

    /* user has checked a box: add selected to arr */
    if (e.target.checked) {
      userSelectionArr.push(i);
    } else { /* user has unchecked box; remove from arr */
      let indexToRemove = userSelectionArr.indexOf(i);
      userSelectionArr.splice(indexToRemove, 1);
    }

    /* sort the array in asc order so that it will match the answer */
    const sortedUserSelectionArr = userSelectionArr.sort(function(a,b){ return a-b; });

    /* update the val of userSelectionArr state */
    this.setState({
      userSelectionArr: sortedUserSelectionArr
    });
  }

  /* which form component to display? */
  whichFormType = () => {
    if (this.props.questionArr) {
      switch(this.props.questionArr[this.props.currentQuestion - 1].type) {
        case "radio":
          return (
            <Radios
              answersArr={this.props.questionArr[this.props.currentQuestion - 1].answer}
              currentQuestion={this.props.currentQuestion}
              userAnswer={this.state.userAnswer}
              handleRadioChange={this.handleRadioChange}
            />
          );
          break;

        case 'select':
          return (
            <MySelect
              answersArr={this.props.questionArr[this.props.currentQuestion - 1].answer}
              currentQuestion={this.props.currentQuestion}
              userAnswer={this.state.userAnswer}
              handleSelectChange={this.handleSelectChange}
            />
          );
          break;

        case 'text':
          return <TextArea handleTextChange={this.handleTextChange} />
          break;

        case 'checkbox':
          return (
            <Checkboxes
              answersArr={this.props.questionArr[this.props.currentQuestion - 1].answer}
              currentQuestion={this.props.currentQuestion}
              userAnswer={this.state.userAnswer}
              handleCheckboxChange={this.handleCheckboxChange}
            />
          );
          break;

        default:
          return <TextArea handleTextChange={this.handleTextChange} />
      }
    }
  }

  /* triggers: crunch answer, navigate fxn, & resets userAnswer to null */
  resetAndNavigate = () => {
    this.props.checkAnswerAndNavigateFxn(this.state.userAnswer, this.state.userSelectionArr);
    this.setState({ userAnswer: null });
  }

  render(){
    /* props not immediately available while App fetches data, so show loader */
    if (!this.props.questionArr) {
      return this.renderLoader();
    }

    return(
      <div>
        Question #{this.props.currentQuestion}:
        <br />
        {this.props.questionArr[this.props.currentQuestion - 1].title}
        <br />
        {this.whichFormType()}
        <br />
        <button>
          <Link onClick={this.resetAndNavigate} to={this.generateToLink()}>{this.generateBtnText()}</Link>
        </button>
        <div>
          <ProgressBar progress={100 / this.props.questionArrLength * this.props.currentQuestion}/>
        </div>
      </div>
    )
  }
}

export default Question;
