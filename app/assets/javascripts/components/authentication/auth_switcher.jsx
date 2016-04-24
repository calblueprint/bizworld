/**
 * @prop view - which authorization modal to show
 */
class AuthSwitcher extends React.Component {

  constructor(props) {
    super(props);
    this.state = { view: this.props.view };
  }

  _changeView = (newView) => {
    this.setState({ view: newView });
  }

  render() {
    if (this.state.view === 0) {
      return <LoginModal viewType={1} update={this._changeView} />;
    }
    return <RegistrationModal viewType={0} update={this._changeView} />;
  }
}

AuthSwitcher.propTypes = { view: React.PropTypes.number.isRequired };
