import { useNotifications } from "../NotificationContext"

const randomId = () => (100 * Math.random()).toFixed(0)

const Notification = () => {
    const notifications = useNotifications()

    const style = {
        border: 'solid',
        padding: 10,
        borderWidth: 1,
        marginBottom: 5
    }

    if (notifications.length === 0) return
    return (
        <div style={style}>
        {notifications.map(note => {
            return (
                <div key={randomId()}>
                {note}
                </div>
            )
        })}
        </div>
    )
}

export default Notification
