import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { Easing, withDelay } from 'react-native-reanimated';
import {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

const FadeInUp = ({
  children,
  duration = 500,
  delay = 0,
  change,
}: {
  children: React.ReactNode;
  duration?: number;
  delay?: number;
  change?: any;
}) => {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(50);

  useEffect(() => {
    opacity.value = withDelay(
      delay,
      withTiming(1, {
        duration: duration,
        easing: Easing.inOut(Easing.ease),
      })
    );

    translateY.value = withDelay(
      delay,
      withTiming(0, {
        duration: duration,
        easing: Easing.inOut(Easing.ease),
      })
    );
  }, [delay, duration, change]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ translateY: translateY.value }],
    };
  });

  return (
    <Animated.View style={[styles.box, animatedStyle]}>
      {children}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  box: {},
});

export default FadeInUp;
