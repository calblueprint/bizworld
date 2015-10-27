/**
 * @prop viewType - type of view to toggle
 *       update   - function to update modal views
 */
class LoginModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = { };
    }

    _updateView = (e) => {
        this.props.update(this.props.viewType);
    }

    _handleChange = (e) => {
        this.setState({ [$(e.target).attr("name")] : $(e.target).val() });
    }

    _attemptLogin = (e) => {
        $.ajax({
            url: "/sign_in",
            type: "POST",
            dataType: "json",
            data: { teacher : this.state },
            success: (msg) => {
                toastr.success(msg.message);
                window.location.replace(msg.to);
            },
            error: (xhr, status, error) => {
                toastr.error(JSON.parse(xhr.responseText).message);
            }
        });
    }

    _handleKeydown = (e) => {
        if (e.which == 13) {
            this._attemptLogin();
        }
    }

    render() {
        return (
            <div>
                <form>
                    <fieldset className="input-container">
                        <label>Email</label>
                        <input name="email" type="text" autoFocus
                            onKeyDown={this._handleKeydown}
                            onChange={this._handleChange} />
                    </fieldset>
                    <fieldset className="input-container">
                        <label>Password</label>
                        <input name="password" type="password"
                            onKeyDown={this._handleKeydown}
                            onChange={this._handleChange} />
                    </fieldset>
                    <fieldset className="input-container">
                        <input name="submit" type="button" value="Login"
                            className="submit-btn" onClick={this._attemptLogin} />
                    </fieldset>
                </form>
                <div className="login-links-container">
                    <a onClick={this._updateView}>Create an account</a><br />
                    {/* TODO(nnarayen 10/27) implement password reset */}
                    <a href="#">Forgot your password?</a>
                </div>
            </div>
        );
    }
}

LoginModal.propTypes = { };
