/**
 * @prop name        - name of the radio input
 * @prop value       - value for this radio question
 * @prop checked      - whether this radio option should be selected
 * @prop option      - option for this radio button
 * @prop editable     - true if fields are editable
 * @prop editableRadio - true if radio is editable
 * @prop focusOnRender - true if focus input on render
 * @prop onTextChange  - callback function when text changes
 * @prop onRadioChange - callback function when radio changes
 */
class EditableRadio extends React.Component {

  componentDidMount() {
    if (this.props.focusOnRender) {
      React.findDOMNode(this.refs.focus).focus();
    }
  }

  render() {
    let radioValue;
    const uniqueId = `${this.props.name}_${this.props.value}`;
    if (this.props.editable) {
      radioValue = (
        <div className="table-stretch">
          <input
            name={this.props.value}
            type="text"
            ref="focus"
            defaultValue={this.props.option}
            onChange={this.props.onTextChange}
            data-index={this.props.value}
          />
        </div>
      );
      deleteButton = (
        <div>
          <a
            className="question-delete"
            onClick={this.props.onDelete}
            data-index={this.props.value}
          >
            <span className="fa fa-times" />
          </a>
        </div>
      );
    } else {
      radioValue = (
        <label className="radio-label" htmlFor={uniqueId}>
          {this.props.option}
        </label>
      );
      deleteButton = null;
    }

    return (
      <div className="radio-option" key={this.props.option}>
        <input
          id={uniqueId}
          type="radio"
          name={this.props.name}
          value={this.props.value} ref="focus"
          onClick={this.props.onRadioChange}
          defaultChecked={this.props.checked}
          disabled={!this.props.editable && !this.props.editableRadio}
        />
          {radioValue}
          {deleteButton}
      </div>
    );
  }
}

EditableRadio.propTypes = {
  name: React.PropTypes.number.isRequired,
  value: React.PropTypes.number.isRequired,
  option: React.PropTypes.string.isRequired,
  checked: React.PropTypes.bool.isRequired,
  editable: React.PropTypes.bool.isRequired,
  editableRadio: React.PropTypes.bool,
  focusOnRender: React.PropTypes.bool,
  onTextChange: React.PropTypes.func,
  onRadioChange: React.PropTypes.func.isRequired,
  onDelete: React.PropTypes.func.isRequired,
};
