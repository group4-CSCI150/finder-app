import token from "./tokenFunctions"

const axios = require('axios')

const baseURL = 'https://us-central1-test150project.cloudfunctions.net/api/user/'
const chatURL = 'https://us-central1-test150project.cloudfunctions.net/api/chat/'
/*
These Functions are used to make database calls.
Some of them receive a body as input or an username.
body is a JSON object. e.g. {username: "Leo", password: "myPassword", email: "myemail@email.com"}
*/
async function getCurrentUser() {
  try {
    let tok = await token.getToken();
    let username = tok.user.username;
    console.log("Username from Token:", username);
    let response = await axios.get(`${baseURL}byID/${username}`);
    console.log(response.data);
    return response.data.user;
  }catch{
    return "Error getting user"
  }
}

const api = {
  // Gets current loggedin user
  getSelf: async () => {
    try {
      return getCurrentUser()

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
      return "Error creating user"
    }
  },

  // Updates a user in the DB
  updateUser: async (username, body) => {
    try {
      let user = await axios.put(`${baseURL}byID/${username}`, body)
      console.log("PUT: ", user.data)
      return user.data
    }catch{
      return "Error updating user"
    }
  },

  // Check if username and password match the ones in the DB then return if match.
  callLogin: async (body) => {
    try {
      let response = await axios.post(`${baseURL}login`, body)
      console.log("LOGIN: ", response.data)
      return response.data
    }catch{
      throw Error("Error login user")
    }
  },

  // Check if username and token match the ones in the DB then return if match.
  callLoginToken: async (body) => {
    try {
      let response = await axios.post(`${baseURL}logintoken`, body);
      console.log("Response: ", response.data);
      return response.data;
    } catch (error) {
      console.log("Error: ", error);
      return { "message": "Error login" };
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
      return "Error getting friends"
    }
  },

  getRecommendations: async () => {
    //try {
      let _user = await getCurrentUser();
      let _username = _user.username;
      let _tags = _user.tags;
      let body = {
        user: _username,
        tags: _tags
      };
      let rec = await axios.post(`${baseURL}finder`, body)
      console.log("Recommendations: ", rec.data)
      return rec.data
  //  }catch{
      //console.log("ERROR")
      //return "Error getting user"
    //}
  },

  sendMessage: async (body) => {
    body.requestType = 'sendMessage';
    let response = await axios.post(`${chatURL}`, body);
    response = response.data;
    console.log(response);
    return response;
  },

  getMessages: async (body) => {
    body.requestType = 'getMessages';
    console.log("Sending:", body);
    let response = await axios.post(`${chatURL}`, body);
    response = response.data;
    if (response.message === 'Success') {
      console.log(response);
      console.log('Retrieved', response.numOfNewMessages, 'new messages.');
      console.log('Messages: ', response.newMessages);
    }
    else {
      console.log('Error getting message');
      console.log(response.message);
    }
    return response.newMessages;
  }
}

export default api;