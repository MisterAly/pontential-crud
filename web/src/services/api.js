import axios from 'axios'

const apiURL = 'http://localhost:3333'

const login = (username, password) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${apiURL}/token`, { username, password })
      .then(response => {
        if (response.status === 200) {
          resolve(response.data.token)
        } else {
          reject(response.data.error)
        }
      })
      .catch(err => reject(err))
  })
}

export default { login, apiURL }