import { AsyncStorage } from 'react-native';
import token from './tokenFunctions';

/*
Returns a list of usernames that the current user has a chat history with
*/
let getChatSessions = async () => {
    try {
        console.log("Getting chat sessions");
        var tok = await token.getToken();
        var thisUser = tok.user.username;
        var users = await AsyncStorage.getItem(thisUser + '-ChatSessions');
        if (users !== null) {
            users = JSON.parse(users);
            console.log('Chat sessions:', users);
            return users;
        }
        else {
            console.log('No chat sessions')
            return [];
        }
    }
    catch (error) {
        console.log('Could not get chat sessions')
    }
};

let createChatSession = async (user) => {
    try {
        var users = await getChatSessions();
        if (users.includes(user)) {
            return;
        }
        else {
            users.push(user);
            console.log('New chat sessions:', users);
            users = JSON.stringify(users);
            var tok = await token.getToken();
            var thisUser = tok.user.username;
            await AsyncStorage.setItem(thisUser + '-ChatSessions', users);
        }
    }
    catch (error) {
        console.log('Could not create chat session with', user);
    }
};

let deleteChatSession = async (user) => {
    try {
        var users = await getChatSessions();
        var index = users.indexOf(user);
        if (index > -1) {
            users.splice(index, 1);
            users = JSON.stringify(users);
            console.log('New chat sessions:', users);
            var tok = await token.getToken();
            var thisUser = tok.user.username;
            await AsyncStorage.removeItem(thisUser + '-' + user);
            await AsyncStorage.setItem(thisUser + '-ChatSessions', users);
        }
        else {
            console.log(user, 'not in', users);
            return;
        }
    }
    catch (error) {
        console.log('Could not delete chat session with', user);
    }
};

let getMessages = async (user) => {
    try {
        console.log("Getting messages");
        var tok = await token.getToken();
        var thisUser = tok.user.username;
        messages = await AsyncStorage.getItem(thisUser + '-' + user);
        if (messages !== null) {
            return JSON.parse(messages);
        }
        else {
            return [];
        }
    }
    catch (error) {
        console.log("Could not get messages from", user, error);
    }
};

let setMessages = async (user, messages) => {
    try {
        msgString = JSON.stringify(messages);
        var tok = await token.getToken();
        var thisUser = tok.user.username;
        await AsyncStorage.setItem(thisUser + '-' + user, msgString);
        return true;
    }
    catch (error) {
        console.log("Could not store messages for", user, error);
        console.log("Messages:", messages);
    }
};

let appendMessages = async (user, messages) => {
    try {
        console.log("Appending messages");
        // First, get previous messages
        oldMessages = await getMessages(user);
        // Next, append new messages to oldMessages and setItem
        newMessages = oldMessages.concat(messages);
        var tok = await token.getToken();
        var thisUser = tok.user.username;
        await AsyncStorage.setItem(thisUser + '-' + user, JSON.stringify(newMessages));
        return true;
    }
    catch (error) {
        console.log("Could not append messages for", user, error);
        console.log("Messages:", messages);
    }
};

let removeMessages = async (user) => {
    try {
        var tok = await token.getToken();
        var thisUser = tok.user.username;
        await AsyncStorage.removeItem(thisUser + '-' + user);
        return true;
    }
    catch (error) {
        console.log("Could not remove messages for", user, error);
    }
};

const storage = {
    getChatSessions: getChatSessions,

    createChatSession: createChatSession,

    deleteChatSession: deleteChatSession,

    getMessages: getMessages,
    
    setMessages: setMessages,

    appendMessages: appendMessages,

    removeMessages: removeMessages,
}

export default storage;