var React = require('react');

/**
 * @prop classrooms - the list of classes
 */
var ClassroomsTable = React.createClass({
    getInitialState: function() {
        return {
            classrooms: [],
        };
    },
    componentDidMount: function() {
        this._fetchClassrooms();
    },
    _fetchClassrooms: function() {
        $.getJSON("/admins/classrooms")
            .done(function(data) {
                this.setState({ classrooms: data });
            }.bind(this))
            .fail(function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this));
    },
    render: function() {
        var classrooms = this.state.classrooms.map(function(classroom) {
            return (
                <Classroom classroom  = {classroom}
                           key        = {classroom["id"]} />
            );
        });
        return (
            <div className="row">
                <div className="col-md-8">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Term</th>
                                <th>Teacher</th>
                                <th># Students</th>
                            </tr>
                        </thead>
                        <tbody>
                            {classrooms}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
});

/**
 * @prop classroom - the info about this classroom
 */
var Classroom = React.createClass({
    getInitialState: function() {
        return {
            classroom: this.props.classroom,
        };
    },
    render: function() {
        return (
            <tr>
                <td>
                    { this.state.classroom["term"] }
                </td>
                <td>
                    { this.state.classroom["teacher"]["email"] }
                </td>
                <td>
                    { this.state.classroom["students"].length }
                </td>
            </tr>
        );
    }
});

module.exports = ClassroomsTable;
