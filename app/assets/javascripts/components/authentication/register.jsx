/**
 * @prop viewType - type of view to toggle
 *       update   - function to update modal views
 */
class RegistrationModal extends DefaultForm {

    _updateView = (e) => {
        this.props.update(this.props.viewType);
    }

    _attemptRegistration = (e) => {
        this._attemptAction("/sign_up", { teacher : this._formFields() });
    }

    render() {
        return (
            <div>
                <div className="login-title">
                    <span className="fa fa-angle-left back"
                        onClick={this._updateView}></span>
                    <h1>New Account</h1>
                </div>
                <form>
                    <div className="input-container">
                        <label htmlFor="first_name">First Name:</label>
                        <input onChange={this._handleChange} name="first_name"
                            type="text" placeholder="John" autoFocus />
                    </div>
                    <div className="input-container">
                        <label htmlFor="last_name">Last Name:</label>
                        <input name="last_name" type="text" placeholder="Doe"
                            onChange={this._handleChange} />
                    </div>
                    <div className="input-container">
                        <label htmlFor="email">Email:</label>
                        <input name="email" type="text"
                            placeholder="johndoe@gmail.com"
                            onChange={this._handleChange} />
                    </div>
                    <div className="input-container">
                        <label htmlFor="password">Password:</label>
                        <input name="password" type="password"
                            onChange={this._handleChange} />
                    </div>
                    <div className="input-container">
                        <label htmlFor="password_confirmation">Confirm
                            Password:</label>
                        <input name="password_confirmation" type="password"
                            onChange={this._handleChange} />
                    </div>
                    <div className="input-container">
                        <label htmlFor="phone">Phone:</label>
                        <input name="phone" type="text" placeholder="(123)
                            456 - 7890" onChange={this._handleChange} />
                    </div>
                    <div className="input-container">
                        <label htmlFor="school">School:</label>
                        <input name="school" type="text"
                            placeholder="Example Middle School"
                            onChange={this._handleChange} />
                    </div>

                    <div className="input-container city-state-picker">
                        <div className="item city">
                            <label htmlFor="city">City:</label>
                            <input name="city" type="text" placeholder="San
                                Francisco" onChange={this._handleChange} />
                        </div>
                        <div className="item state">
                            <label htmlFor="state">State:</label>
                            <StatePicker />
                        </div>
                    </div>

                    <div className="input-container">
                        <label htmlFor="phone">Grade:</label>
                        <GradesPicker />
                    </div>

                    <input name="submit" type="button" value="Create Account"
                        className="submit-button register-button"
                        onClick={this._attemptRegistration} />
                </form>
                <div className="login-links-container">
                    <a onClick={this._updateView}>Already have an account?</a>
                </div>
            </div>
        );
    }
}

RegistrationModal.propTypes = {
    viewType : React.PropTypes.number.isRequired,
    update   : React.PropTypes.func.isRequired
};

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

    _fetchStates() {
        $.getJSON("/states")
            .done((data) => {
                this.setState({ states: data.states });
            })
            .fail((xhr, status, err) => {
                console.error(xhr, status, err.toString());
            });
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.state.states.length != nextState.states.length;
    }

    componentDidUpdate() {
        $(this.refs.select.getDOMNode()).selectpicker('refresh');
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

/**
 * @prop grades - default grades to select
 */
class GradesPicker extends React.Component {

    constructor(props) {
        super(props);
        this.state = { grades: ["3rd", "4th", "5th", "6th", "7th", "8th",
            "other"] };
    }

    componentDidMount() {
        const select = this.refs.select.getDOMNode();
        $(select).selectpicker({ dropupAuto: false });
        $(select).selectpicker('val', this.props.grades.split(/[\s,]+/));
    }

    render() {
        const grades = this.state.grades.map((grade) => {
            return (
                <option key={grade}>{grade}</option>
            );
        });

        return (
            <select name="grades" className="selectpicker grade-select"
                multiple title="Select a grade" ref="select">
                {grades}
            </select>
        )
    }
}

GradesPicker.propTypes = { grades : React.PropTypes.string };
GradesPicker.defaultProps = { grades : "" };
