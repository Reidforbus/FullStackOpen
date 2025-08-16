import { useState } from 'react'
import blogService from '../services/blogs'

const BlogForm = ({ createBlog }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const submitHandler = async (event) => {
        event.preventDefault()
        console.log('Adding blog...', title, author, url)
        createBlog({
            title,
            author,
            url
        })
        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return (
        <div>
            <form onSubmit={submitHandler}>
        Title <input type="text" name="title" value={title} onChange={({ target }) => {setTitle(target.value)}}/><br/>
        Author <input type="text" name="author" value={author} onChange={({ target }) => {setAuthor(target.value)}}/><br/>
        URL <input type="text" name="url" value={url} onChange={({ target }) => {setUrl(target.value)}}/><br/>
                <button type="submit">Create</button>
            </form>
        </div>
    )
}

export default BlogForm
