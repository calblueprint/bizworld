class ClassroomsTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            classrooms: [],
            filters: {
                status : "active",
                program_id : "1",
                range : { }
            }
        };
    }

    componentDidMount() {
        this._fetchClassrooms();
    }

    _fetchClassrooms = () => {
        const success = (data) => { this.setState({ classrooms: data }) }
        APIRequester.getJSON(APIConstants.admins.classrooms, success,
            this.state.filters);
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

    _generateCSVLink() {
        const classrooms = this.state.classrooms.map((val) => { return val.id });
        return APIConstants.admins.download($.param({
            classrooms : classrooms,
            program_id : this.state.filters.program_id
        }));
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
                <form className="filter-form-container">
                    <ClassroomsFilter onFilterChange    = {this._handleFilterChange}
                                      onDateRangeChange = {this._handleDateRangeChange} />
                    <input className="admin-submit-button" name="submit"
                        type="button" value="Submit" onClick={this._fetchClassrooms}/>
                </form>
                <a href={this._generateCSVLink()}>Download CSV</a>
                <table id="header-fixed"></table>
                <table className="table admin-table">
                    <thead id="table-head">
                        <tr>
                            <th>Classroom Name</th>
                            <th>Teacher Name</th>
                            <th>Teacher Email</th>
                            <th>Date Range</th>
                        </tr>
                    </thead>
                    <tbody>
                        { classrooms }
                    </tbody>
                </table>
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

    _formatTeacherName(teacher) {
        return `${teacher.first_name} ${teacher.last_name}`;
    }

    _formatDateRange(classroom) {
        return `${formatDate(classroom.start_date)} to
            ${formatDate(classroom.end_date)}`;
    }

    render() {
        return (
            <tr onClick={this._handleRowClick}>
                <td>
                    { this.state.classroom.name }
                </td>
                <td>
                    { this._formatTeacherName(this.state.classroom.teacher) }
                </td>
                <td>
                    { this.state.classroom.teacher.email }
                </td>
                <td>
                    { this._formatDateRange(this.state.classroom) }
                </td>
            </tr>
        );
    }
}

ClassroomsTableRow.propTypes = { classroom: React.PropTypes.object.isRequired };
