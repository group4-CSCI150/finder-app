import { AsyncStorage } from 'react-native';

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
    getMessages: getMessages,
    
    setMessages: setMessages,

    appendMessages: appendMessages,

    removeMessages: removeMessages,
}

export default storage;