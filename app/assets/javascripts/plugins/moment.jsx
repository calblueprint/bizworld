const DATE_FORMAT = "MMM DD, YYYY";

const formatDate = (date) => {
    return moment(date).format(DATE_FORMAT);
}
