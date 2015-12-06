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
        $(React.findDOMNode(this.refs.select)).selectpicker({ dropupAuto: false });
    }

    _fetchStates() {
        const success = (data) => { this.setState({ states: data.states }) }
        APIRequester.getJSON(APIConstants.pages.states, success);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.state.states.length != nextState.states.length;
    }

    componentDidUpdate() {
        $(React.findDOMNode(this.refs.select)).selectpicker('refresh');
    }

    render() {
        const stateOptions = this.state.states.map((state) => {
            return (
                <option key={state}>{state}</option>
            );
        });

        return (
            <select value={this.props.state} name="state" ref="select"
                className="selectpicker state-select" data-live-search="true">
                {stateOptions}
            </select>
        );
    }
}

StatePicker.propTypes = { state : React.PropTypes.string };
