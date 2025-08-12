const Blog = require('../models/blog')

const nonExistingBlogId = async () => {
    const blog = new Blog({
        title: "WILL BE REMOVED",
        url: "willberemo.ved",
        author: "Will B. Removed",
    })
    await blog.save()
    await blog.deleteOne()

    return blog._id.toString()


}

module.exports = { nonExistingBlogId }
