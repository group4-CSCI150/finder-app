import React, { useState, useEffect } from 'react';
import {
    Animated,
    Easing,
    Dimensions,
} from 'react-native';

export default function SlideInFromBottomView(props) {
    [top, setTop] = useState(new Animated.Value(Dimensions.get('window').height));

    useEffect(() => {
        Animated.timing(
            top,
            {
                toValue: 0,
                duration: 400,
                easing: Easing.out(Easing.poly(4))
            }
        ).start()
    });

    return (
        <Animated.View style={{...props.style, top: top}}>
            {props.children}
        </Animated.View>
    )
}