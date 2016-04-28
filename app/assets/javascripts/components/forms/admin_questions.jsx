/**
 * @prop form_id - the id of the form
 */
class AdminFormQuestions extends DefaultFormQuestions {

    _insertQuestion = (prev_index, prev_number) => {
        const newQuestionStub = Question.createStub({
            form_id: this.props.form_id,
            category: QuestionType.MC,
            number: prev_number + 1,
        });
        const newQuestionList = this.state.questionList.insertAt(prev_index + 1, newQuestionStub);
        this.setState({
            questionList: newQuestionList,
        });
    }

    _saveQuestion = (index, question) => {
        var savingQuestion = Object.assign({}, question);

        const success = (msg) => {
            let savedQuestion = msg.data.question;
            savedQuestion.updatingFromSave = true;

            const newQuestionList = this.state.questionList.replaceAt(index, savedQuestion);
            this.setState({
                questionList: newQuestionList,
            });
        }

        if (Question.isNew(question)) {
              const prevId = this.state.questionList.previousSavedQuestionIdFromIndex(index);
              APIRequester.post(APIConstants.questions.collection, {
                  question: question,
                  insert_after: prevId,
              }, success);
        } else {
            APIRequester.put(APIConstants.questions.member(question.id), question, success);
        }
    }

    _deleteQuestion = (index, question) => {
        const success = () => {
            const newQuestionList = this.state.questionList.removeIndex(index);
            this.setState({
                questionList: newQuestionList,
            });
        }

        if (Question.isNew(question)) {
            success();
        } else {
            APIRequester.delete(APIConstants.questions.member(question.id), success);
        }
    }

    _replaceQuestion = (index, question) => {
        const newQuestionList = this.state.questionList.replaceAt(index, question);
        this.setState({
            questionList: newQuestionList,
        });
    }

    _insertQuestionAtEnd = () => {
        const lastNum = this.state.questionList.questions.length;
        const newQuestionStub = Question.createStub({
            form_id: this.props.form_id,
            category: QuestionType.MC,
            number: lastNum + 1,
        });
        const newQuestionList = this.state.questionList.insertAt(lastNum, newQuestionStub);
        this.setState({
            questionList: newQuestionList,
        });
    }

    _mapQuestions = (question, index) => {
        const AdminQuestion = QuestionType.reactComponentFor(question.category);
        return (
            <AdminQuestion
                question               = {question}
                key                    = {question.id}
                index                  = {index}
                editableOnRender       = {question.editableOnRender}
                updatingFromSave       = {question.updatingFromSave}
                saveCallback           = {this._saveQuestion}
                replaceCallback        = {this._replaceQuestion}
                deleteCallback         = {this._deleteQuestion}
                insertQuestionCallback = {this._insertQuestion}
            />
        );
    }
}

/**
 * @prop question       - the question to display
 * @prop saveCallback   - callback function to save question
 * @prop deleteCallback - callback function to delete question
 */
class AdminMCQuestion extends DefaultAdminQuestion {

    constructor(props) {
        super(props);
        this.state = React.addons.update(this.state, { $merge: {
            shouldUpdate: true,
        }});
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
            options: { $merge: { [index]: newVal } }
        });
        this.setState({ question: newQuestion, shouldUpdate: shouldUpdate });
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
            answer: { $set: $(e.target).attr("value") }
        });
        this.setState({ question: newQuestion });
    }

    _renderAddOptionButton() {
        let addOptionButton;
        if (this.state.editable) {
            addOptionButton = (
                <button className="add-option-button"
                        onClick={this._renderNewOption} >
                    <span className="fa fa-plus"/>
                    Add Option
                </button>
            );
        }
        return addOptionButton;
    }

    render() {
        const radioOptions = this.state.question.options.map((option, index) => {
            const checked = (this.state.question.answer == index);
            return (
                <div className="input-container" key={`input_${this.props.question.id}_${index}`}>
                    <EditableRadio name          = {this.props.question.id}
                                   value         = {index}
                                   option        = {option}
                                   checked       = {checked}
                                   editable      = {this.state.editable}
                                   focusOnRender = {true}
                                   onTextChange  = {this._onOptionChange}
                                   onRadioChange = {this._onRadioChange}
                                   onDelete      = {this._onOptionDelete} />
                </div>
            )
        });

        return (
            <div onMouseEnter={this._onMouseEnter} onMouseLeave={this._onMouseLeave}>
                <fieldset className={`question admin-question mc-question ${this._editClass()}`}
                          onClick={this._startEditing}>
                    { this._renderQuestionHeader() }
                    <div htmlFor={this.props.id}>
                        { this._renderQuestionTitle() }
                    </div>
                    { radioOptions }
                    { this._renderAddOptionButton() }

                    { this.state.editable ? (
                        <div className="input-container">
                            <EditableRadio name          = {this.props.question.id}
                                           value         = {-1}
                                           option        = {'No Correct Option'}
                                           checked       = {this.state.question.answer === null}
                                           editable      = {false}
                                           editableRadio = {true}
                                           onRadioChange = {this._onRadioChange} />
                        </div>
                    ) : null }

                    { this._renderSaveContainer() }
                    { this._renderNewQuestionButton() }
                </fieldset>
            </div>
        );
    }
}

AdminMCQuestion.propTypes = {
    question:       React.PropTypes.object.isRequired,
    saveCallback:   React.PropTypes.func.isRequired,
    deleteCallback: React.PropTypes.func.isRequired,
};

/**
 * @prop question       - the question to display
 * @prop saveCallback   - callback function to save question
 * @prop deleteCallback - callback function to delete question
 */
class AdminInputQuestion extends DefaultAdminQuestion {

    render() {
        return (
            <div onMouseEnter={this._onMouseEnter} onMouseLeave={this._onMouseLeave}>
                <fieldset className={`question admin-question input-question
                                      input-container ${this._editClass()}`}
                          onClick={this._startEditing}>
                    { this._renderQuestionHeader() }
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
    question:       React.PropTypes.object.isRequired,
    saveCallback:   React.PropTypes.func.isRequired,
    deleteCallback: React.PropTypes.func.isRequired,
};
