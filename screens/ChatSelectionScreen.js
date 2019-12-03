import React, {useState, useEffect, useCallback} from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  Button,
  TextInput,
  TouchableOpacity,
  View,
  SafeAreaView,
  Animated,
  Easing,
  RefreshControl,
  ActivityIndicator,
  LayoutAnimation,
  UIManager,
} from 'react-native';
import { withNavigation } from 'react-navigation';

function ChatSelectionScreen(props)  {
    [value, setValue] = useState("");
    
    return (
        <SafeAreaView>
            <TextInput
                style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                onChangeText={text => setValue(text)}
                value={value}
            />
            <Button title={"Chat with user"} 
                    onPress={ () => {props.navigation.navigate('Chat', {name: value, username: value})} }
            />
        </SafeAreaView>
    );
}

export default withNavigation(ChatSelectionScreen);