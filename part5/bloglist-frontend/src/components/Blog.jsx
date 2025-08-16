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
            <div style={style}>
                <div>{blog.title} {blog.author} <button onClick={changeView}>hide</button></div>
                <div>{blog.url}</div>
                <div>likes: {blog.likes} <button onClick={handleLike} value={blog.id}>like</button></div>
                <div>{blog.user.name}</div>
                <div style={displayIfOwned}><button onClick={handleDelete} value={blog.id}>remove</button></div>
            </div>
        )
    } else {
        return (
            <div style={style}>
                {blog.title} {blog.author} <button onClick={changeView}>view</button>
            </div>
        )}
}

Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    handleLike: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired,
}


export default Blog
