/**
 * @prop onDateRangeChange - callback function when date range changes
 * @prop onFilterChange    - callback function when filter changes
 */
const ClassroomsFilter = (props) => {
  const debounceInput = debounceEvent(this.props.onFilterChange, 400);

  return (
    <div className="filter-options">
      <div className="select-options">
        <ClassroomsStatusFilter
          onFilterChange={this.props.onFilterChange}
          onDateRangeChange={this.props.onDateRangeChange}
        />
      </div>
      <div className="filter-input-container">
        <input
          placeholder="Teacher Name or Email" type="text" name="teacher"
          onChange={debounceInput}
        />
      </div>
    </div>
  );
};

ClassroomsFilter.propTypes = {
  onDateRangeChange: React.PropTypes.func.isRequired,
  onFilterChange: React.PropTypes.func.isRequired,
};
