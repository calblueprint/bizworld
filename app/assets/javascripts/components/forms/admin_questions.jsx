/**
 * @prop form_id - the id of the form
 */
class AdminFormQuestions extends DefaultFormQuestions {

    _insertQuestion = (prev_index, prev_number) => {
        const questionStub = Question.createStub({
            form_id: this.props.form_id,
            category: QuestionType.MC,
            number: prev_number + 1,
        });
        const newQuestions = React.addons.update(this.state.questions, {
            $splice: [[prev_index + 1, 0, questionStub]],
        });
        for (let i = prev_index + 2; i < newQuestions.length; i++) {
            newQuestions[i].number += 1;
        }
        this.setState({ questions: newQuestions });
    }

    _saveQuestion = (questionIndex, questionState) => {
        newQuestion = Object.assign({}, this.state.questions[questionIndex]);
        newQuestion.editableOnRender = false;
        newQuestion = React.addons.update(newQuestion, { $merge: questionState });
        const tempQuestions = React.addons.update(this.state.questions, {
            $splice: [[questionIndex, 1, newQuestion]],
        });
        this.setState({ questions: tempQuestions });
    }

    _delQuestion = (questionIndex) => {
        const tempQuestions = React.addons.update(this.state.questions, {
            $splice: [[questionIndex, 1]],
        });
        for (let i = questionIndex; i < tempQuestions.length; i++) {
            tempQuestions[i].number -= 1;
        }
        this.setState({ questions: tempQuestions });
    }

    _mapQuestions = (question, index) => {
        const categoryToComponent = {
            [QuestionType.MC]    : AdminMCQuestion,
            [QuestionType.INPUT] : AdminInputQuestion,
        };
        const AdminQuestion = categoryToComponent[question.category];
        return (
            <AdminQuestion saveSuccess            = {this._saveQuestion}
                           delSuccess             = {this._delQuestion}
                           question               = {question}
                           key                    = {question.id}
                           index                  = {index}
                           insertQuestionCallback = {this._insertQuestion}
                           editableOnRender       = {question.editableOnRender} />
        );
    }
}

/**
 * @prop question    - the MC question to display
 * @prop saveSuccess - callback function when form successfully updates
 * @prop delSuccess  - callback function when question successfully deletes
 */
class AdminMCQuestion extends DefaultAdminQuestion {

    _onOptionChange = (e) => {
        const newOptions = React.addons.update(this.state.options, {
            [$(e.target).attr("name")]: { $set: $(e.target).val() }
        });
        this.setState({ options : newOptions });
    }

    _onRadioChange = (e) => {
        this.setState({ answer: $(e.target).attr("value") });
    }

    render() {
        const radioOptions = this.props.question.options.map((option, index) => {
            const checked = (this.props.question.answer == index);
            return (
                <div className="input-container" key={option}>
                    <EditableRadio name          = {this.props.question.id}
                                   value         = {index}
                                   option        = {option}
                                   checked       = {checked}
                                   editable      = {this.state.editable}
                                   onTextChange  = {this._onOptionChange}
                                   onRadioChange = {this._onRadioChange} />
                </div>
            )
        });

        return (
            <div onMouseEnter={this._onMouseEnter} onMouseLeave={this._onMouseLeave}>
                <fieldset className={`question admin-question mc-question ${this._editClass()}`}
                          onClick={this._startEditing}>
                    { this._renderEditLabel() }
                    <div className="fa fa-trash-o delete-question-button"
                        onClick={this._deleteQuestion}></div>
                    <div htmlFor={this.props.id}>
                        { this._renderQuestionTitle() }
                    </div>
                    { radioOptions }
                    { this._renderSaveContainer() }
                    { this._renderNewQuestionButton() }
                </fieldset>
            </div>
        );
    }
}

AdminMCQuestion.propTypes = {
    question    : React.PropTypes.object.isRequired,
    saveSuccess : React.PropTypes.func.isRequired,
    delSuccess  : React.PropTypes.func.isRequired
};

/**
 * @prop question    - the MC question to display
 * @prop saveSuccess - callback function when form successfully updates
 * @prop delSuccess  - callback function when question successfully deletes
 */
class AdminInputQuestion extends DefaultAdminQuestion {

    render() {
        return (
            <div onMouseEnter={this._onMouseEnter} onMouseLeave={this._onMouseLeave}>
                <fieldset className={`question admin-question input-question
                                      input-container ${this._editClass()}`}
                          onClick={this._startEditing}>
                    { this._renderEditLabel() }
                    <div className="fa fa-trash-o delete-question-button"
                        onClick={this._deleteQuestion}></div>
                    <div htmlFor={this.props.id}>
                        { this._renderQuestionTitle() }
                    </div>
                    <input name={this.props.question.id} type="text"
                        onChange={this.props.onChange} />
                    { this._renderSaveContainer() }
                    { this._renderNewQuestionButton() }
                </fieldset>
            </div>
        );
    }
}

AdminInputQuestion.propTypes = {
    question    : React.PropTypes.object.isRequired,
    saveSuccess : React.PropTypes.func.isRequired,
    delSuccess  : React.PropTypes.func.isRequired
};
