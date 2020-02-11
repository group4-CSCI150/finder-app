import React, {useState, useEffect} from 'react';
import {
    Animated,
    Easing
} from 'react-native';


export default function FadeInView(props) {
    const [opacity] = useState(new Animated.Value(0));
  
    useEffect(() => {
      Animated.timing(
        opacity,
          {
            toValue: 1,
            duration: 500,
            easing: Easing.ease,
          }
      ).start();
    }, []);
  
    return (
      <Animated.View
        style={{
          ...props.style,
          opacity: opacity,
        }}
      >
        {props.children}
      </Animated.View>
    );
  }
