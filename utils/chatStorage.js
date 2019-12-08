import { AsyncStorage } from 'react-native';

/*
Returns a list of usernames that the current user has a chat history with
*/
let getChatSessions = async () => {
    try {
        console.log("Getting chat sessions");
        var users = await AsyncStorage.getItem('ChatSessions');
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
            await AsyncStorage.setItem('ChatSessions', users);
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
            await AsyncStorage.removeItem(user);
            await AsyncStorage.setItem('ChatSessions', users);
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
        messages = await AsyncStorage.getItem(user);
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
        await AsyncStorage.setItem(user, msgString);
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
        await AsyncStorage.setItem(user, JSON.stringify(newMessages));
        return true;
    }
    catch (error) {
        console.log("Could not append messages for", user, error);
        console.log("Messages:", messages);
    }
};

let removeMessages = async (user) => {
    try {
        await AsyncStorage.removeItem(user);
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