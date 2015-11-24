class ClassroomsTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            classrooms: [],
            filters: {
                status : "active",
                range : { }
            }
        };
    }

    componentDidMount() {
        this._fetchClassrooms();
    }

    _fetchClassrooms = () => {
        const success = (data) => { this.setState({ classrooms: data }) }
        APIRequester.getJSON("/admins/classrooms", success, this.state.filters);
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
            <div>
                <div>
                    <form className="filter-form-container">
                        <ClassroomsFilter onFilterChange    = {this._handleFilterChange}
                                          onDateRangeChange = {this._handleDateRangeChange} />
                        <input className="admin-submit-button" name="submit"
                            type="button" value="Submit" onClick={this._fetchClassrooms}/>
                    </form>
                    <table id="header-fixed"></table>
                    <table className="table admin-table">
                        <thead id="table-head">
                            <tr>
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

    _handleRowClick = (e) => {
       window.location.href = `/classrooms/${this.props.classroom.id}`;
    }

    render() {
        return (
            <tr onClick={this._handleRowClick}>
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
