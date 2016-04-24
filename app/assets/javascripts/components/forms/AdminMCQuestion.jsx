/**
 * @prop question    - the question to display
 * @prop saveCallback  - callback function to save question
 * @prop deleteCallback - callback function to delete question
 */
class AdminMCQuestion extends DefaultAdminQuestion {

  constructor(props) {
    super(props);
    this.state = React.addons.update(this.state, { $merge: {
      shouldUpdate: true,
    } });
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.shouldUpdate === false) {
      nextState.shouldUpdate = true;
      return false;
    }
    return true;
  }

  _changeOption(index, newVal, shouldUpdate = true) {
    const newQuestion = React.addons.update(this.state.question, {
      options: { $merge: { [index]: newVal } },
    });
    this.setState({ question: newQuestion, shouldUpdate });
  }

  _onOptionChange = (e) => {
    this._changeOption($(e.target).data("index"), $(e.target).val(), false);
  }

  _renderNewOption = () => {
    this._changeOption(this.state.question.options.length, "");
  }

  _onOptionDelete = (e) => {
    const i = $(e.target).data("index");

    let newAnswer;
    if (this.state.question.answer >= i) {
      newAnswer = this.state.question.answer - 1;
    } else {
      newAnswer = this.state.question.answer;
    }

    const newQuestion = React.addons.update(this.state.question, {
      options: { $splice: [[i, 1]] },
      answer: { $set: newAnswer },
    });
    this.setState({ question: newQuestion });
  }

  _onRadioChange = (e) => {
    const newQuestion = React.addons.update(this.state.question, {
      answer: { $set: $(e.target).attr("value") },
    });
    this.setState({ question: newQuestion });
  }

  _renderAddOptionButton() {
    let addOptionButton;
    if (this.state.editable) {
      addOptionButton = (
        <button
          className="add-option-button"
          onClick={this._renderNewOption}
        >
          <span className="fa fa-plus" />
          Add Option
        </button>
      );
    }
    return addOptionButton;
  }

  render() {
    const radioOptions = this.state.question.options.map((option, index) => {
      const checked = (this.state.question.answer === index);
      return (
        <div className="input-container" key={`input_${this.props.question.id}_${index}`}>
          <EditableRadio
            name={this.props.question.id}
            value={index}
            option={option}
            checked={checked}
            editable={this.state.editable}
            focusOnRender
            onTextChange={this._onOptionChange}
            onRadioChange={this._onRadioChange}
            onDelete={this._onOptionDelete}
          />
        </div>
      );
    });

    return (
      <div onMouseEnter={this._onMouseEnter} onMouseLeave={this._onMouseLeave}>
        <fieldset
          className={`question admin-question mc-question ${this._editClass()}`}
          onClick={this._startEditing}
        >
          {this._renderQuestionHeader()}
          <div htmlFor={this.props.id}>
            {this._renderQuestionTitle()}
          </div>
          {radioOptions}
          {this._renderAddOptionButton()}

          {this.state.editable ? (
            <div className="input-container">
              <EditableRadio
                name={this.props.question.id}
                value={-1}
                option={'No Correct Option'}
                checked={this.state.question.answer === null}
                editable={false}
                editableRadio
                onRadioChange={this._onRadioChange}
              />
            </div>
            ) : null
          }

          {this._renderSaveContainer()}
          {this._renderNewQuestionButton()}
        </fieldset>
      </div>
    );
  }
}

AdminMCQuestion.propTypes = {
  question: React.PropTypes.object.isRequired,
  saveCallback: React.PropTypes.func.isRequired,
  deleteCallback: React.PropTypes.func.isRequired,
};
