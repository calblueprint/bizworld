/**
 * @prop form_id - the id of the form
 */
class AdminFormQuestions extends DefaultFormQuestions {

    _insertQuestion = (prev_index, prev_number) => {
        let questionStub = {
            id: -1,
            form_id: this.props.form_id,
            category: QuestionType.MC,
            options: [''],
            answer: null,
            title: '',
            number: prev_number + 1,
            editable: true,
        };
        const newQuestions = React.addons.update(this.state.questions, {
            $splice: [[prev_index + 1, 0, questionStub]],
        });
        for (let i = prev_index + 2; i < newQuestions.length; i++) {
            newQuestions[i].number += 1;
        }
        this.setState({ questions: newQuestions, isEditing: true });
    }

    _mapQuestions = (question, index) => {
        const categoryToComponent = {
            [QuestionType.MC]    : AdminMCQuestion,
            [QuestionType.INPUT] : AdminInputQuestion,
        };
        const AdminQuestion = categoryToComponent[question.category];
        return (
            <AdminQuestion success  = {this._fetchQuestions}
                           question = {question}
                           key      = {question.id}
                           index    = {index}
                           insertQuestionCallback = {this._insertQuestion}
                           editableOnRender = {question.editable} />
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

    _renderNewQuestionButton() {
        let newButton;
        if (this.state.mouseEntered && !this.state.editable) {
            newButton = (
                <input type="button" value="New Question"
                    className="button-small submit-button new-question-button"
                    onClick={this._insertQuestionAfter} />
            );
        }
        return newButton;
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

    _checkToggleEdit(id) {
        if (!this.state.isEditing) {
            this.toggleEdit();
            this.setState({ isEditing: true })
        }
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

        const questionTitle = (
            <EditableTitle name         = {this.props.question.id}
                           number       = {this.props.question.number}
                           title        = {this.props.question.title}
                           editable     = {this.state.editable}
                           onTextChange = {this._onTitleChange} />
        );

        let editClass = "";
        let editLabel;
        if (this.state.isEditing) {
            editClass = "editing-true";
            editLabel = (
                <div className="edit-label">Currently editing</div>
            )
        } else {
            editLabel = (
                <div className="edit-label">Click anywhere to edit</div>
            )
        }

        return (
            <div onMouseEnter={this._onMouseEnter} onMouseLeave={this._onMouseLeave}>
                <fieldset className={`question admin-question mc-question ${editClass}`}
                          onClick={() => this._checkToggleEdit(this.props.question.id)}>
                    { editLabel }
                    <div className="fa fa-trash-o delete-question-button"
                        onClick={this._deleteQuestion}></div>
                    <div htmlFor={this.props.id}>
                        { questionTitle }
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

    _renderNewQuestionButton() {
        let newButton;
        if (this.state.mouseEntered && !this.state.editable) {
            newButton = (
                <input type="button" value="New Question"
                    className="button-small submit-button new-question-button"
                    onClick={this._insertQuestionAfter} />
            );
        }
        return newButton;
    }

    _checkToggleEdit(id) {
        if (!this.state.isEditing) {
            this.toggleEdit();
            console.log(this)
            this.setState({ isEditing: true })
        }
    }

    render() {
        const questionTitle = (
            <EditableTitle name         = {this.props.question.id}
                           number       = {this.props.question.number}
                           title        = {this.props.question.title}
                           editable     = {this.state.editable}
                           onTextChange = {this._onTitleChange} />
        );

        let editClass = "";
        let editLabel;
        if (this.state.isEditing) {
            editClass = "editing-true";
            editLabel = (
                <div className="edit-label">Currently editing</div>
            )
        } else {
            editLabel = (
                <div className="edit-label">Click anywhere to edit</div>
            )
        }

        return (
            <div onMouseEnter={this._onMouseEnter} onMouseLeave={this._onMouseLeave}>
                <fieldset className={`question admin-question input-question
                                      input-container ${editClass}`}
                          onClick={() => this._checkToggleEdit(this.props.question.id)}>
                    { editLabel }
                    <div className="fa fa-trash-o delete-question-button"
                        onClick={this._deleteQuestion}></div>
                    <div htmlFor={this.props.id}>
                        { questionTitle }
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
