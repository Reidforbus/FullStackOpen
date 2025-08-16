import PropTypes from 'prop-types'
import { useState } from 'react'

const Blog = ({ blog, username, handleLike, handleDelete }) => {
    const [viewDetails, setViewDetails] = useState(false)

    const changeView = async () => {
        setViewDetails(!viewDetails)
    }

    const displayIfOwned = { display: blog.user.username === username ? '' : 'none' }

    const style = {
        border: 'solid',
        borderWidth: 1,
        padding: 5,
        marginBottom: 2,
    }

    if (viewDetails) {
        return (
            <div style={style} className='blog'>
                <div className='bloginfo'>{blog.title} {blog.author} <button onClick={changeView}>hide</button></div>
                <div className='url'>{blog.url}</div>
                <div className='likes'>likes: {blog.likes} <button onClick={handleLike} value={blog.id}>like</button></div>
                <div className='user'>{blog.user.name}</div>
                <div style={displayIfOwned} className='removeButton'><button onClick={handleDelete} value={blog.id}>remove</button></div>
            </div>
        )
    } else {
        return (
            <div style={style} className='blog'>
                <div className='bloginfo'>{blog.title} {blog.author} <button onClick={changeView}>view</button></div>
            </div>
        )}
}

Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    handleLike: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired,
}


export default Blog
