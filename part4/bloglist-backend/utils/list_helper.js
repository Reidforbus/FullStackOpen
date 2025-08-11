const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((total, blog) => { return total + blog.likes }, 0)
}

const favoriteBlog = (blogs) => {
    if (blogs.length < 2) return blogs[0]
    return blogs.reduce((prev, curr) => { return curr.likes > prev.likes ? curr : prev }, blogs[0])
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) return undefined

    const map = new Map()
    blogs.forEach(blog => {
        const author = blog.author
        if (map.has(author)) {
            map.set(author, map.get(author) + 1)
        } else {
            map.set(author, 1)
        }
    })

    let best_author
    let best = 0
    for ( const [author, n] of map.entries()){
        if (n > best){
            best_author = author
            best = n
        }
    }
    return { author: best_author, blogs: best }
}

const mostLikes = (blogs) => {
    if (blogs.length === 0) return undefined

    const map = new Map()
    blogs.forEach(blog => {
        const author = blog.author
        if (map.has(author)) {
            map.set(author, map.get(author) + blog.likes)
        } else {
            map.set(author, blog.likes)
        }
    })

    let best_author
    let best = -1
    for ( const [author, n] of map.entries()){
        if (n > best){
            best_author = author
            best = n
        }
    }
    return { author: best_author, likes: best }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}
