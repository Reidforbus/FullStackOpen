import { useNotifications } from "../NotificationContext"

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
                <div>
                {note}
                </div>
            )
        })}
        </div>
    )
}

export default Notification
