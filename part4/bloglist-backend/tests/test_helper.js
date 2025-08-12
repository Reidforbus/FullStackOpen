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

const testAuth = async (api) => {
    const response = await api
        .post('/api/login')
        .send({
            username: process.env.TEST_USERNAME,
            password: process.env.TEST_PW
        })

    return { Authorization: `Bearer ${response.body.token}` }
}

module.exports = { nonExistingBlogId, testAuth }
