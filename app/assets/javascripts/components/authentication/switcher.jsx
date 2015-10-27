/**
 * @prop view - which authorization modal to show
 */
class AuthSwitcher extends React.Component {

    constructor(props) {
        super(props);
        this.state = { view: this.props.view };
    }

    changeView = (newView) => {
        this.setState({ view: newView });
    }

    render() {
        var authView;
        if (this.state.view == 0) {
            authView = <LoginModal viewType = {1}
                                   update   = {this.changeView} />
        } else {
            authView = <RegistrationModal viewType = {0}
                                          update   = {this.changeView} />
        }
        return authView;
    }
}

AuthSwitcher.propTypes = { };
