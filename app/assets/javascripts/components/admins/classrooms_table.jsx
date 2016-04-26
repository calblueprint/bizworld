/**
 * @prop program - the current program
 */
class ClassroomsTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            classrooms: [],
            filters: {
                range      : { },
                status     : "active",
                program_id : this.props.program.id
            }
        };
    }

    componentDidMount() {
        this._fetchClassrooms();

        this.refs.successLabel.getDOMNode().addEventListener("animationend", function() {
            this.style.animation = "";
        });
    }

    _showUpdateAnimation = (e) => {
        this.refs.successLabel.getDOMNode().style.animation = "show-confirm 2s ease-in-out";
    }

    _fetchClassrooms = () => {
        const success = (data) => { this.setState({ classrooms: data, isLoading: false }); }
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
        this.setState({ filters: newState }, this._fetchClassrooms);
        this._showUpdateAnimation();
    }

    _handleFilterChange = (e) => {
        // Updates state of filters in a manner that avoids overriding other fields.
        const newState = React.addons.update(this.state.filters, {
            [$(e.target).attr("name")]: { $set: $(e.target).val() }
        });
        this.setState({ filters: newState }, this._fetchClassrooms);
        this._showUpdateAnimation();
    }

    _generateClassroomCSVLink() {
        const classrooms = this.state.classrooms.map((val) => { return val.id });
        return APIConstants.admins.download_classrooms($.param({
            classrooms : classrooms,
            program_id : this.state.filters.program_id
        }));
    }

    _generateTeacherCSVLink() {
        const classrooms = this.state.classrooms.map((val) => { return val.id });
        return APIConstants.admins.download_teachers($.param({
            classrooms : classrooms,
            program_id : this.state.filters.program_id
        }));
    }

    render() {
        let classrooms;
        let spinner;
        if (this.state.isLoading) {
            spinner = (
                <div className="spinner-container"></div>
            )
        } else {
            spinner = null;
            classrooms = (
                <tbody>
                    { this.state.classrooms.map((classroom) => {
                    return (
                        <ClassroomsTableRow classroom  = {classroom}
                                            key        = {classroom.id} />
                    );
                    })}
                </tbody> )
        }

        return (
            <div>
                <ProgramInfo program = {this.props.program} />
                <div className="table-col">
                    <div className="admin-filter-container">
                        <form className="filter-form-container">
                            <h1>Filter Settings
                                <label ref="successLabel" className="update-success-label">
                                    <span className="fa fa-check"></span>Updated!</label>
                            </h1>
                            <ClassroomsFilter onFilterChange    = {this._handleFilterChange}
                                              onDateRangeChange = {this._handleDateRangeChange} />
                        </form>
                    </div>
                    <div className="admin-table-header">
                        <h1 className="admin-table-title">Filtered Classrooms:
                            <span> { this.state.classrooms.length } found</span>
                        </h1>
                        <div className="dropdown">
                            <button className="button button-small download-dropdown-button"
                                    id="download-label" data-toggle="dropdown">
                                <span className="fa fa-download"/>
                                Downloads
                                <span className="caret"></span>
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="download-label">
                                <li className="dropdown-link" >
                                    <a href={this._generateClassroomCSVLink()}>
                                        <span className="fa fa-file-text fa-fw"/>
                                        Download Assessment Responses
                                    </a>
                                </li>
                                <li className="dropdown-link">
                                    <a href={this._generateTeacherCSVLink()}>
                                        <span className="fa fa-university fa-fw"/>
                                        Download Classroom Summaries
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div>
                      <table className="table admin-table">
                          <thead id="table-head">
                              <tr>
                                  <th>Classroom Name</th>
                                  <th>Teacher Name</th>
                                  <th>Teacher Email</th>
                                  <th>Date Range</th>
                              </tr>
                          </thead>
                          { classrooms }
                      </table>
                    </div>
                    <div className="admin-spinner">
                        { spinner }
                    </div>
                </div>
            </div>
        );
    }
}

ClassroomsTable.propTypes = { program: React.PropTypes.object.isRequired };

/**
 * @prop classroom - the info about this classroom
 */
class ClassroomsTableRow extends React.Component {

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
                    { this.props.classroom.name }
                </td>
                <td>
                    { this._formatTeacherName(this.props.classroom.teacher) }
                </td>
                <td>
                    { this.props.classroom.teacher.email }
                </td>
                <td>
                    { this._formatDateRange(this.props.classroom) }
                </td>
            </tr>
        );
    }
}

ClassroomsTableRow.propTypes = { classroom: React.PropTypes.object.isRequired };
