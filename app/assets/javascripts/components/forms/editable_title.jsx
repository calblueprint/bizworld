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
                <input name={this.props.name} type="text"
                    defaultValue={this.props.title}
                    onChange={this.props.onTextChange} />
            );
        } else {
            questionTitle = (
                <label>
                    { `${this.props.number}. ${this.props.title}`}
                </label>
            );
        }

        return (
            <div className="question-title-part">
                { questionTitle }
            </div>
        );
    }
}

EditableTitle.propTypes = {
    name          : React.PropTypes.number.isRequired,
    number        : React.PropTypes.number.isRequired,
    title         : React.PropTypes.string.isRequired,
    editable      : React.PropTypes.bool.isRequired,
    onTextChange  : React.PropTypes.func.isRequired,
};
