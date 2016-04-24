/**
 * @prop state - default state to select
 */
class StatePicker extends React.Component {

  constructor(props) {
    super(props);
    this.state = { states: [] };
  }

  componentDidMount() {
    this._fetchStates();
    $(this.refs.select.getDOMNode()).selectpicker({ dropupAuto: false });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.states.length !== nextState.states.length;
  }

  componentDidUpdate() {
    $(this.refs.select.getDOMNode()).selectpicker('refresh');
  }

  _fetchStates() {
    const success = (data) => this.setState({ states: data.states });
    APIRequester.getJSON(APIConstants.pages.states, success);
  }

  render() {
    const stateOptions = this.state.states.map((state) => (
      <option key={state}>{state}</option>
    ));

    return (
      <select
        value={this.props.state} name="state" ref="select"
        className="selectpicker state-select" data-live-search="true"
      >{stateOptions}</select>
    );
  }
}

StatePicker.propTypes = { state: React.PropTypes.string };
