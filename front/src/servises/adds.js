import axios from 'axios'
const baseUrl = '/api/adds'

const getAll = () => {
  const request = axios.get(baseUrl)

  return request.then(response => response.data)
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const remove = (objectid) => {
    const request = axios.delete(`${baseUrl}/${objectid}`)
    return request.then(response => response.data)
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

export default { getAll, create, update, remove }