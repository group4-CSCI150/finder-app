const axios = require('axios')

const baseURL = 'https://us-central1-test150project.cloudfunctions.net/api/user/'
/*
These Functions are used to make database calls.
Some of them receive a body as input or an username.
body is a JSON object. e.g. {username: "Leo", password: "myPassword", email: "myemail@email.com"}
*/

const api = {

  // Returns a single user from the DB
  getUserById: async (username) => {
    let user = await axios.get(`${baseURL}byID/${username}`)
    console.log("GET: ", user.data)
    return user.data
  },

  // Returns a list of ALL users in the DB (Probably not needed)
  getAllUser: async () => {
    let user = await axios.get(`${baseURL}`)
    console.log("GET: ", user.data)
    return user.data
  },

  // Creates a user in the DB. In this case the body MUST contain an attribute username and password
  createUser: async (body) => {
    let user = await axios.post(`${baseURL}`, body)
    console.log("POST: ", user.data)
    return user.data
  },

  // Updates a user in the DB
  updateUser: async (username, body) => {
    let user = await axios.put(`${baseURL}byID/${username}`, body)
    console.log("PUT: ", user.data)    
    return user.data

  },

  // Check if username and password match the ones in the DB then return if match.
  callLogin: async (body)=> {
    let user = await axios.post(`${baseURL}login`, body)
    console.log("LOGIN: ", user.data)
    return user.data
  },
}

export default api;