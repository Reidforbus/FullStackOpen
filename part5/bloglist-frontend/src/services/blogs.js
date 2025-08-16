import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
    token = `Bearer ${newToken}`
}

const getAll = async () => {
    const res= await axios.get(baseUrl)
    return res.data
}

const create = async (blogData) => {
    const conf = { headers: { authorization: token } }
    const res = await axios.post(baseUrl, blogData, conf)
    return res.data
}

const like = async (blogData) => {
    const url = baseUrl + `/${blogData.id}`
    const updated = structuredClone(blogData)
    updated.likes += 1
    delete updated.id
    const res = await axios.put(url, updated)
    return res.status === 204
}

const remove = async (id) => {
    const url = baseUrl + `/${id}`
    const conf = { headers: { authorization: token } }
    const res = await axios.delete(url ,conf)
    return res.status === 204
}

export default { getAll, like, create, remove, setToken }
