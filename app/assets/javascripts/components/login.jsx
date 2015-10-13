class LoginPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className="input-container">
          <input id="login-input" type="text" placeholder="email address"/>
        </div>
        <div className="input-container">
          <input id="password-input" type="password" placeholder="password"/>
        </div>
        <div className="input-container">
          <input id="login-button" type="button" value="Login"/>
        </div>
      </div>
    );
  }
}

LoginPage.propTypes = { };
