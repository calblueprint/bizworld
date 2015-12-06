const ALL_GRADES = ["Kindergarten", "1st", "2nd", "3rd", "4th", "5th", "6th",
    "7th", "8th", "9th", "10th", "11th", "12th"];

/**
 * @prop grades - default grades to select
 */
class GradesPicker extends React.Component {

    componentDidMount() {
        const select = React.findDOMNode(this.refs.select);
        $(select).selectpicker({ dropupAuto: false });
        $(select).selectpicker('val', this.props.grades.split(/[\s,]+/));
    }

    render() {
        const grades = ALL_GRADES.map((grade) => {
            return (
                <option key={grade}>{grade}</option>
            );
        });

        return (
            <select name="grades" className="selectpicker grade-select"
                multiple title="Select a grade" ref="select">
                { grades }
            </select>
        )
    }
}

GradesPicker.propTypes = { grades : React.PropTypes.string };
GradesPicker.defaultProps = { grades : "" };
