import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import AlertBar from './components/AlertBar'

const App = () => {
    const [popup, setPopup] = useState(null)
    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState(null)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async (event) => {
        event.preventDefault()
        console.log('logging in...', username, password)

        try {
            const user = await loginService.login({ username, password })
            window.localStorage.setItem('blogListUserInfo', JSON.stringify(user))
            setUser(user)
            blogService.setToken(user.token)
            setUsername('')
            setPassword('')
        } catch (exception) {
            setPopup({ msg:'Username or password incorrect', type:'error'})
            setTimeout(() => {
                setPopup(null)
            }, 5000)
        }
    }

    const handleLogout = async (event) => {
        event.preventDefault()
        setUser(null)
        blogService.setToken(null)
        window.localStorage.clear()
    }

    useEffect(() => {
        const userInfo = window.localStorage.getItem('blogListUserInfo')
        if (userInfo) {
            const user = JSON.parse(userInfo)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs( blogs )
        )  
    }, [])

    if (user === null) {
        return (
            <div>
            <AlertBar popup={popup}/>
            <p>Please log in before proceeding</p>
            <form onSubmit={handleLogin}>
            Username <input 
                name="username"
                type="text"
                value={username}
                onChange={({target}) => setUsername(target.value)}
            /><br/>
            Password <input 
                name="password" 
                type="password"
                value={password}
                onChange={({target}) => setPassword(target.value)}
            /><br/>
            <button type="submit">Log in</button>
            </form>
            </div>
        )
    }

    return (
        <div>
        <AlertBar popup={popup}/>
        <p>Logged in as {user.name}</p><button onClick={handleLogout}>Log out</button>
        <hr/>
        <BlogForm popupSetter={setPopup}/>
        <hr/>
        <h2>blogs</h2>
        {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
        )}
        </div>
    )
}

export default App
