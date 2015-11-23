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
                <select name="status" onChange={this._handleSelectStatusChange}>
                    <option value="active">Currently Active</option>
                    <option value="date_range">Date Range</option>
                    <option value="">All Classrooms</option>
                </select>
                <br />
                { dateRangeInput }
            </div>
        );
    }
}

ClassroomsStatusFilter.propTypes = {
    onFilterChange: React.PropTypes.func.isRequired,
};

class ClassroomsFilter extends React.Component {
    render() {
        return (
            <div>
                <ClassroomsStatusFilter onFilterChange    = {this.props.onFilterChange}
                                        onDateRangeChange = {this.props.onDateRangeChange} />
                <br />
                <span>Teacher Email: </span>
                <input type="text" name="email" onChange={this.props.onFilterChange} />
                <br />
            </div>
        );
    }
}

ClassroomsFilter.propTypes = {
    onDateRangeChange : React.PropTypes.func.isRequired,
    onFilterChange    : React.PropTypes.func.isRequired
};

