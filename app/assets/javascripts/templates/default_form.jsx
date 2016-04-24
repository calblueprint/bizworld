/**
 * Component to handle barebones form submissions
 */
class DefaultForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = { };
  }

  _handleChange = (e) => {
    this.setState({ [$(e.target).attr("name")]: $(e.target).val() });
  }

  _handleDateRangeChange = (startDate, endDate) => {
    this.setState({
      start_date: startDate,
      end_date: endDate,
    });
  }

  _toggleEdit = () => {
    this.setState({ editable: !this.state.editable });
  }

  _focusInputField = () => {
    $(React.findDOMNode(this.refs.focus)).focus();
  }

  _formFields() {
    // Necessary because bootstrap-select does not fire onChange events
    const extraFields = { };
    $('.selectpicker').each((index, element) => {
      extraFields[$(element).attr("name")] = $(element).val();
    });
    return $.extend({}, this.state, extraFields);
  }

  _attemptAction(endpoint, data, success = () => {}) {
    APIRequester.post(endpoint, data, success);
  }

  // This component has no render() method so eslint will complain. Since we
  // never use this component directly, we'll just ignore the generated error.
  /* eslint react/require-render-return: 0 */

}
