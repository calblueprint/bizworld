/**
 * @prop label        - label of field to show
 * @prop data         - current input for label
 * @prop editable     - true if fields are editable
 * @prop handleChange - callback function when form inputs change
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
                    defaultValue={this.props.data}
                    onChange={this.props.handleChange} />
            );
        } else {
            inputVal = this.props.data
        }

        return (
            <div>
                <label htmlFor={this.props.label}>
                    { this.props.label }:
                </label>
                { inputVal }
            </div>
        );
    }
}

EditableInput.propTypes = {
    data         : React.PropTypes.string,
    label        : React.PropTypes.string.isRequired,
    editable     : React.PropTypes.bool.isRequired,
    handleChange : React.PropTypes.func.isRequired
};
