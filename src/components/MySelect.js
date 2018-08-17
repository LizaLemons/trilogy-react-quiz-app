
import React, {Component} from 'react';

class MySelect extends Component {

  constructor(props){
    super(props);
    this.state = {
      chosenSelect: null
    }
  }

  updateUserChoice = (e) => {
    this.setState({
      chosenSelect: e.target.value
    });
    this.props.handleSelectChange(e);
  }

  render(){
    return(
      <div>
        <label>
          <select value={this.state.chosenSelect || "select-one"} onChange={(e) => this.updateUserChoice(e)}>
            <option disabled value="select-one">Select One:</option>
            {this.props.answersArr.map((answer, i) => {
              return (
                <option key={`${answer}${i}`} value={answer}>{answer}</option>
              )}
            )}
          </select>
        </label>
      </div>
    )
  }

}
export default MySelect;
