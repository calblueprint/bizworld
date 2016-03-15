/**
 * @prop name          - name of the question
 * @prop number        - number of question on form
 * @prop title         - title of question
 * @prop editable      - true if fields are editable
 * @prop onTextChange  - callback function when text changes
 */
class EditableTitle extends React.Component {

    render() {
        let questionTitle;
        if (this.props.editable) {
            questionTitle = (
                <div className="question-title-part input-container">
                    <label className="question-number">
                        { `${this.props.number}.` }
                    </label>
                    <input name={this.props.name} className="question-title"
                        type="text" defaultValue={this.props.title}
                        onChange={this.props.onTextChange} />
                </div>
            );
        } else {
            questionTitle = (
                <div className="question-title-part">
                    <label className="question-number">
                        { `${this.props.number}.`}
                    </label>
                    <h1 className="question-title">{ `${this.props.title}` }</h1>
                </div>
            );
        }

        return questionTitle;

    }
}

EditableTitle.propTypes = {
    name          : React.PropTypes.number.isRequired,
    number        : React.PropTypes.number.isRequired,
    title         : React.PropTypes.string.isRequired,
    editable      : React.PropTypes.bool.isRequired,
    onTextChange  : React.PropTypes.func.isRequired,
};
