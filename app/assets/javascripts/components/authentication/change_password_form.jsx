/**
 * @prop model - the type of model this user has (admin or teacher)
 * @prop user_id - the id of the user
 * @prop reset_token - the password reset token if this form is in reset mode
 */
class ChangePasswordForm extends DefaultForm {

  _attemptPasswordUpdate = (e) => {
    if (this.props.reset_token == null) {
      APIRequester.put(APIConstants.passwords.update(this.props.user_id), {
        old_password: this.refs.old_password.getDOMNode().value,
        password: this.refs.new_password.getDOMNode().value,
        password_confirmation: this.refs.password_confirmation.getDOMNode().value,
        model: this.props.model,
      }, (msg) => {});
    } else {
      APIRequester.post(APIConstants.passwords.reset, {
        password: this.refs.new_password.getDOMNode().value,
        password_confirmation: this.refs.password_confirmation.getDOMNode().value,
        reset_password_token: this.props.reset_token,
        model: this.props.model,
      }, (msg) => {});
    }
  }

  render() {
    let old_password;
    if (this.props.reset_token == null) {
      old_password = (
        <fieldset className="input-container">
          <label>Current password</label>
          <input
            type="password" ref="old_password"
            name="old_password"
            onChange={this._handleChange}
          />
        </fieldset>
      );
    }

    return (
      <div>
        <h1 className="teacher-account-header">Change Password</h1>
        {old_password}
        <fieldset className="input-container">
          <label>New password</label>
          <input
            type="password" ref="new_password"
            name="password"
            onChange={this._handleChange}
          />
        </fieldset>
        <fieldset className="input-container">
          <label>Confirm new password</label>
          <input
            type="password" ref="password_confirmation"
            name="password_confirmation"
            onChange={this._handleChange}
          />
        </fieldset>
        <button
          type="button" className="submit-button"
          onClick={this._attemptPasswordUpdate}
        >
          Submit
        </button>
      </div>
    );
  }
}

ChangePasswordForm.propTypes = {
  model: React.PropTypes.string,
  user_id: React.PropTypes.number,
  reset_token: React.PropTypes.string,
};
