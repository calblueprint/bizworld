var React = require('react');

/**
 * @prop classrooms - the list of classes
 */
var ClassroomsTable = React.createClass({
    getInitialState: function() {
        return {
            classrooms: this.props.classrooms,
        };
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
                                <th>Module</th>
                                <th>Teacher</th>
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
                    { this.state.classroom["module"]}
                </td>
                <td>
                    {
                        /*TODO: Access the actual teacher entity, instead of just the ID.*/ 
                        this.state.classroom["teacher_id"] 
                    }
                </td>
            </tr>
        );
    }
});

module.exports = ClassroomsTable;
