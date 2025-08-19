import { createContext, useContext, useReducer } from "react";

const notificationReducer = (state, action) => {
    switch (action.type) {
        case 'ADD':
            return state.concat(action.payload)
        case 'CLEAR':
            return state.slice(1)
        default:
            return state
    }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
    const [notifications, notificationDispatch] = useReducer(notificationReducer, [])

    return (
        <NotificationContext.Provider value={[notifications, notificationDispatch]}>
        {props.children}
        </NotificationContext.Provider>
    )
}

export const useNotifications = () => {
    const notificationsAndDispatch = useContext(NotificationContext)
    return notificationsAndDispatch[0]
}

export const useNotificationDispatch = () => {
    const notificationsAndDispatch = useContext(NotificationContext)
    return notificationsAndDispatch[1]
}

export default NotificationContext
