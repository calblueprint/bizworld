/**
 * @prop label    - label of field to show
 * @prop data     - current input for select
 * @prop editable - true if fields are editable
 * @prop multiple - whether this select can have multiple values
 */
class EditableSelect extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        var selectVal;
        if (this.props.editable) {
            if (this.props.multiple) {
                selectVal = <GradesPicker grades = { this.props.data } />
            } else {
                selectVal = <StatePicker state = { this.props.data } />
            }
        } else {
            selectVal = this.props.data;
        }

        return (
            <div>
                <label htmlFor={this.props.label}>
                    { this.props.label }:
                </label>
                { selectVal }
            </div>
        );
    }
}

EditableSelect.propTypes = {
    data          : React.PropTypes.string,
    label         : React.PropTypes.string.isRequired,
    multiple      : React.PropTypes.bool.isRequired,
    editable      : React.PropTypes.bool.isRequired
};
