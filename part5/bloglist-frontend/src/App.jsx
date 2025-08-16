import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import AlertBar from './components/AlertBar'
import Togglable from './components/Toggleable'

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
            showPopup('Username or password incorrect', 'error' )
        }
    }

    const handleLogout = async (event) => {
        event.preventDefault()
        setUser(null)
        blogService.setToken(null)
        window.localStorage.clear()
    }

    const showPopup = (msg, type) => {
        setPopup({ msg, type })
        setTimeout(() => setPopup(null), 3000)
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
        const updateBlogs = async () => {
            const result = await blogService.getAll()
            setBlogs(result)
        }
        updateBlogs()
    }, [])

    const blogFormRef = useRef()

    const createBlog = async (blog) => {
        blogFormRef.current.toggleVisibility()
        const newBlog = await blogService.create(blog)
        newBlog.user = user
        setBlogs(blogs.concat(newBlog))
        showPopup('Added new blog')
    }

    const handleLike = async (event) => {
        const blog = blogs.find(blog => blog.id === event.target.value)
        console.log('Liking ', blog.id)
        const result = await blogService.like(blog)
        if (result) {
            setBlogs(blogs.map(b => {
                return b.id === blog.id
                    ? { ...blog, likes: blog.likes + 1 }
                    : b
            }))
        }
    }

    const handleDelete = async (event) => {
        const blog = blogs.find(blog => blog.id === event.target.value)
        if (window.confirm(`Remove blog '${blog.title}' by ${blog.author}`)){
            console.log('Deleting ', blog.id)
            const result = await blogService.remove(blog.id)
            if (result) {
                setBlogs(blogs.filter(b => {
                    return b.id !== blog.id
                }))
            }
        }
    }




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
                        onChange={({ target }) => setUsername(target.value)}
                    /><br/>
            Password <input
                        name="password"
                        type="password"
                        value={password}
                        onChange={({ target }) => setPassword(target.value)}
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
            <Togglable buttonLabel='add blog' ref={blogFormRef}>
                <BlogForm createBlog={createBlog}/>
            </Togglable>
            <hr/>
            <h2>blogs</h2>
            {blogs
                .sort((blogA, blogB) => blogB.likes - blogA.likes)
                .map(blog =>
                    <Blog key={blog.id} blog={blog}
                        username={user.username}
                        handleLike={handleLike}
                        handleDelete={handleDelete}
                    />
                )}
        </div>
    )
}

export default App
