import * as WebBrowser from 'expo-web-browser';
import React, {useState, useEffect, useCallback} from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
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

import { MonoText } from '../components/StyledText';

import ImageSwiper from '../components/components';


/*
  Needed for LayoutAnimation to work on Android
*/
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}


function FadeInFromRightView(props) {
  const [opacity] = useState(new Animated.Value(0))  // Initial value for opacity: 0
  const [left] = useState(new Animated.Value(50))

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(
        opacity,
        {
          toValue: 1,
          duration: 500,
          easing: Easing.ease,
        }
      ),
      Animated.timing(
        left,
        {
          toValue: 0,
          duration: 500,
          easing: Easing.out(Easing.ease),
        }
      )
    ]).start()
  }, [])

  return (
    <Animated.View                 // Special animatable View
      style={{
        ...props.style,
        opacity: opacity,         // Bind opacity to animated value
        left: left,
      }}
    >
      {props.children}
    </Animated.View>
  );
}


function wait(timeout) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}


function ActivityFeed(props) {
  [refreshing, setRefreshing] = useState(false);

  function onRefresh() {
    setRefreshing(true);
    wait(3000).then(() => {
      setRefreshing(false);
    });
  }
  /*
  const onRefresh = useCallback(() => {

  });*/

  return (
    <View style={styles.activityFeedContainer}>
      <ScrollView refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.activityFeedHeader}>
          <Text style={styles.activityFeedTextTitle}>Notifications</Text>
        </View>
        
        <View style={styles.activityFeedContentContainer}>
          <Text>
            This is where new events, unread chat messages, etc. will be displayed.
          </Text> 
        </View>
      </ScrollView>
    </View>
  );
}

/*
Component Wrapper for TouchableOpacity
function myButton(props) {
  return (
    <View>
      <View>
        <TouchableOpacity {...props}>
        </TouchableOpacity>
      </View>
    </View>
  );
}*/

async function loadFriendRecommendation() {
  /*
  Placeholder definition
  */
  await wait(3000);

  return {
    id: 1,
    name: 'Test User',
    img1: 'image uri'
  };
}

function FriendRecommendation(props) {

  [shouldDisplayFriend, setShouldDisplayFriend] = useState(false);
  [friendLoaded, setFriendLoaded] = useState(false);
  [friendData, setFriendData] = useState( {} );

  function onFindFriendPress() {
    LayoutAnimation.configureNext(
      LayoutAnimation.create(
        1000,
        LayoutAnimation.Types.easeInEaseOut,
        LayoutAnimation.Properties.opacity
      )
    );
    setShouldDisplayFriend(true);
  }

  function onFriendRecClosePress() {
    LayoutAnimation.configureNext(
      LayoutAnimation.create(
        500,
        LayoutAnimation.Types.easeInEaseOut,
        LayoutAnimation.Properties.opacity
      )
    );
    setShouldDisplayFriend(false);
    setFriendLoaded(false);
  }

  if (!shouldDisplayFriend) {
    return (
      <View style={[styles.friendRecContainer, {height: 100}]}>
        <View style={styles.centerContent}>
          <TouchableOpacity style={styles.findFriendButton} onPress={onFindFriendPress}>
            <View style={styles.centerContent}>
              <Text style={{color: 'white'}}>Find a friend!</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  else if (!friendLoaded) {
    // Load friend recommendation
    loadFriendRecommendation().then( (studentData) => {
      /*
      Use JSON friend data to display the recommendation
      */
     /*
      Additional code to load images, etc. 
      Then, setFriendLoaded(true);
     */
      setFriendLoaded(true);
      setFriendData(studentData);
    });
    return (
      <View style={styles.friendRecContainer}>
        <View style={styles.centerContent}>
          <ActivityIndicator size="large" color="#000000ff" />
        </View>
      </View>
    );
  }
  else {
    return (
      <View style={styles.friendRecContainer}>
        <FadeInFromRightView>
          <Image source={require('../images/stock_photo.jpg')} style={styles.friendRecImage} />
          <View style={styles.friendRecTextNameContainer}>
            <Text style={styles.friendRecTextName}>{friendData.name}</Text> 
          </View>
          <View style={styles.friendRecCloseButtonContainer}>
            <TouchableOpacity style={styles.friendRecCloseButton} onPress={onFriendRecClosePress}>
              <Text>Close</Text>
            </TouchableOpacity>
          </View>
        </FadeInFromRightView>
      </View>
    );
  }
}

export default function HomeScreen(props) {

  return ( 
    <SafeAreaView style={styles.appContainer}>
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <Text style={styles.headerTextTitle}>Home</Text>
        </View>
      </View>
      <ScrollView bounces={'false'}> 
        <ImageSwiper imgUris={['../images/stock_photo.jpg', '../images/stock_photo.jpg', '../images/stock_photo.jpg',
                              '../images/stock_photo.jpg', '../images/stock_photo.jpg', '../images/stock_photo.jpg']} />
        <ActivityFeed />
        
        <View><Text>Sample text sample text sample text sample text sample text sample text</Text></View>
        <View><Text>Sample text sample text sample text sample text sample text sample text</Text></View>
        <View><Text>Sample text sample text sample text sample text sample text sample text</Text></View>
        <View><Text>Sample text sample text sample text sample text sample text sample text</Text></View>
        <View><Text>Sample text sample text sample text sample text sample text sample text</Text></View>
      </ScrollView>
    </SafeAreaView>
  );
}

import Constants from 'expo-constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#555',
    //marginTop: Constants.statusBarHeight
  },
  appContainer: {
    backgroundColor: '#214786',
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activityFeedContainer: {
    height: '100%',
    backgroundColor: 'white',
  },
  activityFeedTextTitle: {
    fontSize: 30,
    color: 'black',
  },
  activityFeedContentContainer: {
    marginTop: 10,
  },
  headerContainer: {
    height: 50,
    backgroundColor: '#214786',
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTextTitle: {
    color: 'white',
    fontSize: 30,
  },
  findFriendButton: {
    backgroundColor: '#214786',
    width: 120,
    height: 60,
  },
  friendRecContainer: {
    height: 350,
    backgroundColor: '#ac1a2f',
  },
  friendRecImage: {
    height: '100%',
    maxWidth: '100%',
    zIndex: -1,
  },
  friendRecTextNameContainer: {
    zIndex: 1,
    position: 'absolute',
    bottom: 5,
    left: 5,
  },
  friendRecTextName: {
    fontSize: 40,
    color: 'white',
    textShadowColor: 'black',
    textShadowRadius: 3,
  },
  friendRecCloseButtonContainer: {
    zIndex: 1,
    position: 'absolute',
    top: 5,
    left: 5,
  }
});
