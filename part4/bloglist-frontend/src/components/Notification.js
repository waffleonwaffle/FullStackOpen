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

// eslint-disable-next-line import/no-anonymous-default-export
export default Notification