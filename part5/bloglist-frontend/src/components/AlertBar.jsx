const AlertBar = ({ popup }) => {
    if (!popup) {
        return
    }

    return (
        <div>
            <h3>{popup.msg}</h3>
        </div>
    )
}

export default AlertBar
