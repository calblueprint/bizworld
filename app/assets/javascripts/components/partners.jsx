var React = require('react');

/**
 * @prop partners - the list of partners
 */
var PartnerList = React.createClass({
    getInitialState: function() {
        return {
            partners: this.props.partners,
        };
    },
    render: function() {
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
});

/**
 * @prop partner - the info about this partner
 */
var Partner = React.createClass({
    getInitialState: function() {
        return {
            partner: this.props.partner,
        };
    },
    render: function() {
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
});

module.exports = PartnerList;
