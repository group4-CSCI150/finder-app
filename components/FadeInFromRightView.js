import React, {useState, useEffect} from 'react';
import {
    View,
    Animated,
    Easing
} from 'react-native';


export default function FadeInFromRightView(props) {
    const [opacity] = useState(new Animated.Value(0));
    const [left] = useState(new Animated.Value(50));
  
    useEffect(() => {
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
      <Animated.View
        style={{
          ...props.style,
          opacity: opacity,
          left: left,
        }}
      >
        {props.children}
      </Animated.View>
    );
  }
