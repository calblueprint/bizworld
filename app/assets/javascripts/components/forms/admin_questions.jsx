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

    _mapQuestions = (question, index) => {
        const categoryToComponent = {
            [QuestionType.MC]    : AdminMCQuestion,
            [QuestionType.INPUT] : AdminInputQuestion,
        };
        const AdminQuestion = categoryToComponent[question.category];
        return (
            <AdminQuestion success                = {this._fetchQuestions}
                           question               = {question}
                           key                    = {question.id}
                           index                  = {index}
                           insertQuestionCallback = {this._insertQuestion}
                           editableOnRender       = {question.editableOnRender} />
        );
    }
}

/**
 * @prop question - the MC question to display
 * @prop success  - callback function when form successfully updates
 */
class AdminMCQuestion extends DefaultAdminQuestion {

    _onMouseEnter = (e) => {
        this.setState({ mouseEntered: true });
    }

    _onMouseLeave = (e) => {
        this.setState({ mouseEntered: false });
    }

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
    question : React.PropTypes.object.isRequired,
    success  : React.PropTypes.func.isRequired
};

/**
 * @prop success  - callback function when form answers successfully update
 * @prop question - the MC question to display
 */
class AdminInputQuestion extends DefaultAdminQuestion {

    // TODO: delete question
    _onMouseEnter = (e) => {
        this.setState({ mouseEntered: true });
    }

    _onMouseLeave = (e) => {
        this.setState({ mouseEntered: false });
    }

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
    success  : React.PropTypes.func.isRequired,
    question : React.PropTypes.object.isRequired
};
