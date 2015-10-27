class LoginPage extends React.Component {

    constructor(props) {
        super(props);
    }

    _attemptLogin = (e) => {
        $.ajax({
            url: "/sign_in",
            type: "POST",
            dataType: "json",
            data: {
                "teacher" : {
                    "email"    : $("input[name=email]").val() ,
                    "password" : $("input[name=password]").val()
                }
            },
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
                        <input name="email" type="text"
                            onKeyDown={this._handleKeydown} autoFocus />
                    </fieldset>
                    <fieldset className="input-container">
                        <label>Password</label>
                        <input name="password" type="password"
                            onKeyDown={this._handleKeydown} />
                    </fieldset>
                    <fieldset className="input-container">
                        <input name="submit" type="button" value="Login" className="submit-btn"
                            onClick={this._attemptLogin} />
                    </fieldset>
                </form>
            </div>
        );
    }
}

LoginPage.propTypes = { };
