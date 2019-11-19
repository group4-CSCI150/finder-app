import token from "./tokenFunctions"

const axios = require('axios')

const baseURL = 'https://us-central1-test150project.cloudfunctions.net/api/user/'
/*
These Functions are used to make database calls.
Some of them receive a body as input or an username.
body is a JSON object. e.g. {username: "Leo", password: "myPassword", email: "myemail@email.com"}
*/

const api = {
  // Gets current loggedin user
  getCurrentUser: async () => {
    try {
      let username = await token.getToken()
      username = JSON.parse(username).user.username
      console.log(username)
      let user = await axios.get(`${baseURL}byID/${username}`)
      console.log(user.data)
      return user.data.user
    }catch{
      return "Error getting user"
    }

  },

  // Returns a single user from the DB
  getUserById: async (username) => {
    try {
      let user = await axios.get(`${baseURL}byID/${username}`)
      console.log("GET: ", user.data)
      return user.data
    }catch{
      return "Error getting user"
    }
  },

  // Returns a list of ALL users in the DB (Probably not needed)
  getAllUser: async () => {
    try {
      let user = await axios.get(`${baseURL}`)
      console.log("GET: ", user.data)
      return user.data
    }catch{
      return "Error getting user"
    }
  },

  // Creates a user in the DB. In this case the body MUST contain an attribute username and password
  createUser: async (body) => {
    try {
      let user = await axios.post(`${baseURL}`, body)
      console.log("POST: ", user.data)
      return user.data
    }catch{
      return "Error getting user"
    }
  },

  // Updates a user in the DB
  updateUser: async (username, body) => {
    try {
      let user = await axios.put(`${baseURL}byID/${username}`, body)
      console.log("PUT: ", user.data)
      return user.data
    }catch{
      return "Error getting user"
    }
  },

  // Check if username and password match the ones in the DB then return if match.
  callLogin: async (body) => {
    try {
      let user = await axios.post(`${baseURL}login`, body)
      console.log("LOGIN: ", user.data)
      return user.data
    }catch{
      return "Error getting user"
    }
  },

  getFriends: async () => {
    try {
      let username = await token.getToken()
      username = JSON.parse(username).user.username
      let friends = await axios.get(`${baseURL}byIDList/${username}`)
      console.log("GET Friends: ", friends.data)
      return friends.data
    }catch{
      return "Error getting user"
    }
  },

  getRecomendations: async (body) => {
    try {
      let rec = await axios.post(`${baseURL}finder`, body)
      console.log("Recommendations: ", rec.data)
      return rec.data
    }catch{
      console.log("ERROR")
      return "Error getting user"
    }
  }
}

export default api;