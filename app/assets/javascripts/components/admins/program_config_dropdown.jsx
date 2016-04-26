const allColors = ["#c0392b", "#e67e22", "#f1c40f", "#1abc9c", "#2ecc71", "#3498db", "#9b59b6", "#34495e"];
const allIcons = ["graduation-cap", "line-chart", "pencil", "film", "paper-plane", "pie-chart", "paint-brush", "briefcase"];

/**
 * @prop updateColor - callback to change selected color in parent state
 */
class ProgramColorDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen  : false,
      displayColor : "#c0392b"
    };
  }

  _updateSelectedColor = (color) => {
    this.props.updateColor(color);
    this.setState({
      dropdownOpen : false,
      displayColor : color
    });
  }

  _showDropdown = () => {
    this.setState({
      dropdownOpen : true
    });
  }

  render () {
    const colors = allColors.map((c) =>  {
      return (
        <ProgramColor color = {c}
               updateColor = {this._updateSelectedColor} />
      )
    });
    return (
      <div className="picker-container">
        <div className="preview-container" style={{background: this.state.displayColor}}
          onClick={this._showDropdown}></div>
        <div className={`program-dropdown dropdown-${this.state.dropdownOpen}`}>
          { colors }
        </div>
      </div>
    )
  }
}

ProgramColorDropdown.propTypes = { updateColor: React.PropTypes.func.isRequired }

/**
 * @prop color       - the color to show
 * @prop updateColor - callback to change preview color in modal
 */
class ProgramColor extends React.Component {
  constructor(props) {
    super(props);
  }

  _updateSelectedColor = (e) => {
    this.props.updateColor(e.target.getAttribute("data-color"));
  }

  render () {
    return (
      <div className="preview-square" style={{background: this.props.color}}
        data-color={this.props.color} onClick={this._updateSelectedColor}></div>
    )
  }
}

ProgramColor.propTypes = {
  color: React.PropTypes.string.isRequired,
  updateColor: React.PropTypes.func.isRequired
}

/**
 * @prop updateIcon - callback to change selected icon in parent state
 */
class ProgramIconDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen : false,
      displayIcon  : "graduation-cap"
    };
  }

  _updateSelectedIcon = (icon) => {
    this.props.updateIcon(icon);
    this.setState({
      dropdownOpen : false,
      displayIcon  : icon
    });
  }

  _showDropdown = () => {
    this.setState({
      dropdownOpen : true
    });
  }

  render () {
    const icons = allIcons.map((i) =>  {
      return (
        <ProgramIcon icon = {i}
              updateIcon = {this._updateSelectedIcon} />
      )
    });
    return (
      <div className="picker-container">
        <div className={`preview-container fa fa-${this.state.displayIcon}`}
          onClick={this._showDropdown}></div>
        <div className={`program-dropdown dropdown-${this.state.dropdownOpen}`}>
          { icons }
        </div>
      </div>
    )
  }
}

ProgramIconDropdown.propTypes = { updateIcon: React.PropTypes.func.isRequired }


/**
 * @prop icon       - the icon to show
 * @prop updateIcon - callback to change preview icon in modal
 */
class ProgramIcon extends React.Component {
  constructor(props) {
    super(props);
  }

  _updateSelectedIcon = (e) => {
    this.props.updateIcon(e.target.getAttribute("data-icon"));
  }

  render () {
    return (
      <div className={`preview-square fa fa-${this.props.icon}`}
        data-icon={this.props.icon} onClick={this._updateSelectedIcon}></div>
    )
  }
}

ProgramIcon.propTypes = {
  icon: React.PropTypes.string.isRequired,
  updateIcon: React.PropTypes.func.isRequired
}
