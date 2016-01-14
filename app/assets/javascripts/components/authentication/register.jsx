/**
 * @prop viewType - type of view to toggle
 *       update   - function to update modal views
 */
class RegistrationModal extends DefaultForm {

    _updateView = (e) => {
        this.props.update(this.props.viewType);
    }

    _attemptRegistration = (e) => {
        this._attemptAction(APIConstants.sessions.sign_up,
            { teacher : this._formFields() });
    }

    _renderInput(name, label, type, placeholder, focus = false) {
        return (
            <div className="input-container">
                <label htmlFor={name}>{label}:</label>
                <input onChange={this._handleChange} name={name}
                    type={type} placeholder={placeholder} autoFocus={focus} />
            </div>
        );
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
                    { this._renderInput("first_name", "First Name", "text", "John", true) }
                    { this._renderInput("last_name", "Last Name", "text", "Doe") }
                    { this._renderInput("email", "Email", "text", "johndoe@gmail.com") }
                    { this._renderInput("password", "Password", "password", "") }
                    { this._renderInput("password_confirmation", "Confirm Password", "password", "") }
                    { this._renderInput("phone_number", "Phone", "text", "(123) 456 - 7880") }
                    { this._renderInput("school", "School", "text", "School Name") }
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
