/**
 * @prop partners - the list of partners
 */
class PartnerList extends React.Component {

    constructor(props) {
        super(props);
        this.state = { partners: this.props.partners };
    }

    render() {
        var partners = this.state.partners.map(function(partner) {
            return (
                <Partner partner  = {partner}
                         key      = {partner["id"]} />
            );
        });
        return (
            <div className="row">
                <div className="col-md-8">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Partner</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {partners}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

PartnerList.propTypes = { partners: React.PropTypes.array.isRequired };
PartnerList.defaultProps = { partners: [] };

/**
 * @prop partner - the info about this partner
 */
class Partner extends React.Component {

    constructor(props) {
        super(props);
        this.state = { partner: this.props.partner }
    }

    render() {
        return (
            <tr>
                <td>
                    { this.state.partner["email"] }
                </td>
                <td>
                    { this.state.partner["first_name"]}
                </td>
                <td>
                    { this.state.partner["last_name"] }
                </td>
            </tr>
        );
    }
}

Partner.propTypes = { partner: React.PropTypes.object.isRequired };
Partner.defaultProps = { partner: {} };
