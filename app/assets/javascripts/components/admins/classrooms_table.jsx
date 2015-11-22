/**
 * @prop status - The initial status to filter classrooms by. One of 'active', 'inactive', or ''
 */
class ClassroomsTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            classrooms: [],
            filters: {
                status : this.props.status,
                range : { }
            }
        };
    }

    componentDidMount() {
        this._fetchClassrooms();
    }

    _fetchClassrooms = () => {
        $.getJSON("/admins/classrooms", this.state.filters)
            .done((data) => {
                this.setState({ classrooms: data });
            })
            .fail((xhr, status, err) => {
                console.error(xhr, status, err.toString());
            });
    }

    _handleDateRangeChange = (startDate, endDate) => {
        const newState = React.addons.update(this.state.filters, {
            range: {
                start: { $set: startDate },
                end:   { $set: endDate }
            }
        });
        this.setState({ filters: newState });
    }

    _handleFilterChange = (e) => {
        // Updates state of filters in a manner that avoids overriding other fields.
        const newState = React.addons.update(this.state.filters, {
            [$(e.target).attr("name")]: { $set: $(e.target).val() }
        });
        this.setState({ filters: newState });
    }

    render() {
        const classrooms = this.state.classrooms.map((classroom) => {
            return (
                <ClassroomsTableRow classroom  = {classroom}
                                    key        = {classroom.id} />
            );
        });

        return (
            <div className="row">
                <div className="col-md-8 col-md-offset-2">
                    <form className="filterForm">
                        <ClassroomsFilter onFilterChange    = {this._handleFilterChange} 
                                          onDateRangeChange = {this._handleDateRangeChange} />
                        <input name="submit" type="button" value="Submit" onClick={this._fetchClassrooms}/>
                    </form>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Term</th>
                                <th>Teacher</th>
                                <th># Students</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            { classrooms }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

/**
 * @prop classroom - the info about this classroom
 */
class ClassroomsTableRow extends React.Component {

    constructor(props) {
        super(props);
        this.state = { classroom: this.props.classroom };
    }

    render() {
        return (
            <tr>
                <td>
                    { this.state.classroom.term }
                </td>
                <td>
                    { this.state.classroom.teacher.email }
                </td>
                <td>
                    { this.state.classroom.students.length }
                </td>
                <td>
                    { this.state.classroom.start_date }
                </td>
                <td>
                    { this.state.classroom.end_date }
                </td>
            </tr>
        );
    }
}

ClassroomsTableRow.propTypes = { classroom: React.PropTypes.object.isRequired };
