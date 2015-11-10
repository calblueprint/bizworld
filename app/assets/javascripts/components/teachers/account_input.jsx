/**
 * @prop label         - label of teacher field to show
 * @prop data          - current input for label
 * @prop editable      - true if fields are editable
 * @prop onChangeInput - callback function when form inputs change
 */
class EditableInput extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        var inputVal;
        if (this.props.editable) {
            inputVal = (
                <input name={this.props.label} type="text"
                    value={this.props.data} onChange={this.props.onChangeInput} />
            );
        } else {
            inputVal = this.props.data
        }

        return (
            <div>
                <label>{this.props.label}: </label> {inputVal}
            </div>
        );
    }
}

EditableInput.propTypes = {
    onChangeInput : React.PropTypes.func.isRequired,
    editable      : React.PropTypes.bool,
    label         : React.PropTypes.string.isRequired,
    data          : React.PropTypes.string.isRequired
};
