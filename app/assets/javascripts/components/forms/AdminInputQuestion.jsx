/**
 * @prop question    - the question to display
 * @prop saveCallback  - callback function to save question
 * @prop deleteCallback - callback function to delete question
 */
class AdminInputQuestion extends DefaultAdminQuestion {

  render() {
    return (
      <div onMouseEnter={this._onMouseEnter} onMouseLeave={this._onMouseLeave}>
        <fieldset
          className={
            `question admin-question input-question
            input-container ${this._editClass()}`
          }
          onClick={this._startEditing}
        >
          {this._renderQuestionHeader()}
          <div htmlFor={this.props.id}>
            {this._renderQuestionTitle()}
          </div>
          <input
            name={this.props.question.id}
            type="text"
            onChange={this.props.onChange}
          />
          {this._renderSaveContainer()}
          {this._renderNewQuestionButton()}
        </fieldset>
      </div>
    );
  }
}

AdminInputQuestion.propTypes = {
  question: React.PropTypes.object.isRequired,
  saveCallback: React.PropTypes.func.isRequired,
  deleteCallback: React.PropTypes.func.isRequired,
};
