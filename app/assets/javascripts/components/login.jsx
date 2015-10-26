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
          <div className="input-container">
            <input name="email" type="text" placeholder="Email address"
              onKeyDown={this._handleKeydown} autoFocus />
          </div>
          <div className="input-container">
            <input name="password" type="password" placeholder="Password"
              onKeyDown={this._handleKeydown} />
          </div>
          <div className="input-container">
            <input name="submit" type="button" value="Login"
              onClick={this._attemptLogin} />
          </div>
        </form>
      </div>
    );
  }
}

LoginPage.propTypes = { };
