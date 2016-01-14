/**
 * @prop onFilterChange - function that is called onChange for inputs, updates state
 */
class ClassroomsStatusFilter extends React.Component {
    constructor(props) {
        super(props);
        this.state = { };
    }

    _handleSelectStatusChange = (e) => {
        // Updates state of status variable and whether to show the dateRangeInput.
        this.props.onFilterChange(e);
        this.setState({ showDateRangeInput: $(e.target).val() === "date_range" });
    }

    _handleDateRangeChange = (startDate, endDate) => {
        this.props.onDateRangeChange(startDate, endDate);
        this.setState({
            rangeStart: startDate,
            rangeEnd: endDate
        });
    }

    render() {
        let dateRangeInput;
        if (this.state.showDateRangeInput) {
            dateRangeInput = (
                <DateRangeInput onFilterChange   = { this._handleDateRangeChange }
                                initialStartDate = { this.state.rangeStart }
                                initialEndDate   = { this.state.rangeEnd } />
            );
        }

        return (
            <div>
                <div className="classroom-status-filter">
                    <select className="classroom-status-select" name="status" onChange={this._handleSelectStatusChange}>
                        <option value="active">Currently Active</option>
                        <option value="date_range">Date Range</option>
                        <option value="">All Classrooms</option>
                    </select>
                    { dateRangeInput }
                </div>
                <ProgramFilter onChange = {this.props.onFilterChange}
                               showAll  = {false} />
            </div>
        );
    }
}

ClassroomsStatusFilter.propTypes = {
    onFilterChange: React.PropTypes.func.isRequired,
};

/**
 * @prop onDateRangeChange - callback function when date range changes
 * @prop onFilterChange    - callback function when filter changes
 */
class ClassroomsFilter extends React.Component {
    render() {
        return (
            <div className="filter-options">
                <div className="select-options">
                    <ClassroomsStatusFilter onFilterChange    = {this.props.onFilterChange}
                                            onDateRangeChange = {this.props.onDateRangeChange} />
                </div>
                <div className="filter-input-container">
                    <input placeholder="Teacher Info" type="text" name="teacher"
                        onChange={this.props.onFilterChange} />
                </div>
            </div>
        );
    }
}

ClassroomsFilter.propTypes = {
    onDateRangeChange : React.PropTypes.func.isRequired,
    onFilterChange    : React.PropTypes.func.isRequired
};
