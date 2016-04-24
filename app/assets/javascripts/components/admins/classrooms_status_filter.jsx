/**
 * @prop onFilterChange - onChange callback for inputs
 * @prop onDateRangeChange - onChange callback for the date range
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
      rangeEnd: endDate,
    });
  }

  render() {
    let dateRangeInput;
    if (this.state.showDateRangeInput) {
      dateRangeInput = (
        <DateRangeInput
          onFilterChange={this._handleDateRangeChange}
          initialStartDate={this.state.rangeStart}
          initialEndDate={this.state.rangeEnd}
        />
      );
    }

    return (
      <div>
        <div className="classroom-status-filter">
          <select
            className="classroom-status-select"
            name="status" onChange={this._handleSelectStatusChange}
          >
            <option value="active">Currently Active</option>
            <option value="date_range">Filter by Date Range</option>
            <option value="">All Classrooms</option>
          </select>
          {dateRangeInput}
        </div>
      </div>
    );
  }
}

ClassroomsStatusFilter.propTypes = {
  onFilterChange: React.PropTypes.func.isRequired,
  onDateRangeChange: React.PropTypes.func.isRequired,
};
