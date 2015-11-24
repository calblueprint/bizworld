/**
 * @prop name          - name of the radio input
 * @prop view          - view type for this radio question
 * @prop value         - value for this radio question
 * @prop checked       - whether this radio option should be selected
 * @prop option        - option for this radio button
 * @prop editable      - true if fields are editable
 * @prop onTextChange  - callback function when text changes
 * @prop onRadioChange - callback function when radio changes
 */
class EditableRadio extends React.Component {

    render() {
        let radioValue;
        const uniqueId = this.props.name + this.props.option;
        const disabled = (this.props.view == FormViewType.ADMIN && !this.props.editable);
        if (this.props.editable) {
            radioValue = (
                <input name={this.props.value} type="text"
                    defaultValue={this.props.option}
                    onChange={this.props.onTextChange} />
            );
        } else {
            radioValue = (
                <label className="radio-label" htmlFor={uniqueId}>
                    {this.props.option}
                </label>
            );
        }

        return (
            <div className="radio-option" key={this.props.option}>
                <input id={uniqueId} type="radio" name={this.props.name}
                    value={this.props.value} onClick={this.props.onRadioChange}
                    defaultChecked={this.props.checked}
                    disabled={disabled} />
                { radioValue }
            </div>
        );
    }
}

EditableRadio.propTypes = {
    name          : React.PropTypes.number.isRequired,
    view          : React.PropTypes.number.isRequired,
    value         : React.PropTypes.number.isRequired,
    option        : React.PropTypes.string.isRequired,
    checked       : React.PropTypes.bool.isRequired,
    editable      : React.PropTypes.bool.isRequired,
    onTextChange  : React.PropTypes.func.isRequired,
    onRadioChange : React.PropTypes.func.isRequired
};
