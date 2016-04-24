class ResetPasswordModal extends DefaultForm {

  constructor(props) {
    super(props);
    this.state = { showForm: true };
  }

  _attemptPasswordReset = (e) => {
    this._attemptAction(APIConstants.passwords.request_reset, {
      email: this.refs.email.getDOMNode().value,
    }, () => this.setState({ showForm: false }));
  }

  _handleKeydown = (e) => {
    // Enter
    if (e.which === 13) {
      this._attemptPasswordReset();
    }
  }

  render() {
    if (this.state.showForm) {
      return (
        <div>
          <div className="login-title">
            <h1>Reset Your Password</h1>
          </div>
          <form>
            <fieldset className="input-container">
              <label>
                Enter your email address and we will send you a link to reset your password.
              </label>
              <input
                ref="email" type="text" autoFocus
                onKeyDown={this._handleKeydown}
                onChange={this._handleChange}
              />
            </fieldset>
            <input
              name="submit" type="button" value="Send password reset email"
              className="submit-button login-button" onClick={this._attemptPasswordReset}
            />
          </form>
        </div>
      );
    }
    return (
      <div className="login-title">
        <h1>A password reset email has been sent.</h1>
      </div>
    );
  }
}
