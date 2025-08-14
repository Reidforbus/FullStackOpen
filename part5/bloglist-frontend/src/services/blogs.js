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
    const conf = { headers: { authorization: token }}
    const res = await axios.post(baseUrl, blogData, conf)
    return res.data
}

export default { getAll , create, setToken }
