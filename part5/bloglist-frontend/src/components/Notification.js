import PropTypes from 'prop-types'
const Notification = ({type, message }) => {
    if (message === null) {
        return null
    }

    return (
        <div className={type}>
            {message}
        </div>
    )
}
Notification.propTypes = {
    type: PropTypes.string,
    message: PropTypes.string
}


// eslint-disable-next-line import/no-anonymous-default-export
export default Notification