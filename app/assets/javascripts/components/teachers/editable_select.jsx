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

    componentDidUpdate(prevProps) {
        // Workaround since selectpicker creates duplicate DOM elements
        if (prevProps.editable) {
            $('.bootstrap-select').remove();
        }
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
            <fieldset className="input-container">
                <div className="label-container">
                    <label htmlFor={this.props.label}>
                        { this.props.label }:
                    </label>
                </div>
                <div className="input-box-container">
                    { selectVal }
                </div>
            </fieldset>
        );
    }
}

EditableSelect.propTypes = {
    data          : React.PropTypes.string,
    label         : React.PropTypes.string.isRequired,
    multiple      : React.PropTypes.bool.isRequired,
    editable      : React.PropTypes.bool.isRequired
};
