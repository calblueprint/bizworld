/**
* @prop endpoint - the endpoint we should hit for updating the password
*/
class ChangePasswordForm extends DefaultForm {

    _attemptPasswordUpdate = (e) => {
        APIRequester.put(APIConstants.passwords.update(this.props.user_id), {
                old_password          : this.refs.old_password.getDOMNode().value,
                password              : this.refs.new_password.getDOMNode().value,
                password_confirmation : this.refs.password_confirmation.getDOMNode().value,
                model                 : this.props.model
            }, (msg) => {} );
    }


    render() {
      return (
          <div>
              <h1 className="teacher-account-header">Change Password</h1>
              <fieldset className="input-container">
                  <label>Current password</label>
                  <input type="password" ref="old_password"
                      name="old_password"
                      onChange={this._handleChange} />
              </fieldset>
              <fieldset className="input-container">
                  <label>New password</label>
                  <input type="password" ref="new_password"
                      name="password"
                      onChange={this._handleChange} />
              </fieldset>
              <fieldset className="input-container">
                  <label>Confirm new password</label>
                  <input type="password" ref="password_confirmation"
                      name="password_confirmation"
                      onChange={this._handleChange} />
              </fieldset>
              <button type="button" className="submit-button"
                  onClick={this._attemptPasswordUpdate}>
                  Submit
              </button>
          </div>
      )
    }
}

ChangePasswordForm.propTypes = {
    model      : React.PropTypes.string.isRequired,
    user_id    : React.PropTypes.number.isRequired
};
