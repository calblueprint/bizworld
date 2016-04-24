/**
 * @prop viewType - type of view to toggle
 * @prop update   - function to update modal views
 */
class LoginModal extends DefaultForm {

  _updateView = (e) => {
    this.props.update(this.props.viewType);
  }

  _attemptLogin = (e) => {
    this._attemptAction(APIConstants.sessions.sign_in,
                        { teacher: this._formFields() });
  }

  _handleKeydown = (e) => {
    // Enter
    if (e.which === 13) {
      this._attemptLogin();
    }
  }

  render() {
    return (
      <div>
        <div className="login-title">
          <h1>Bizworld Educator Portal</h1>
        </div>
        <form>
          <fieldset className="input-container">
            <label>Email</label>
            <input
              name="email" type="text" autoFocus
              onKeyDown={this._handleKeydown}
              onChange={this._handleChange}
            />
          </fieldset>
          <fieldset className="input-container">
            <label>Password</label>
            <input
              name="password" type="password"
              onKeyDown={this._handleKeydown}
              onChange={this._handleChange}
            />
          </fieldset>
          <input
            name="submit" type="button" value="Login"
            className="submit-button login-button" onClick={this._attemptLogin}
          />
        </form>
        <div className="login-links-container">
          <a onClick={this._updateView}>Create an account</a><br />
          <a href="/forgot_password">Forgot your password?</a>
        </div>
      </div>
    );
  }
}

LoginModal.propTypes = {
  viewType: React.PropTypes.number.isRequired,
  update: React.PropTypes.func.isRequired,
};
