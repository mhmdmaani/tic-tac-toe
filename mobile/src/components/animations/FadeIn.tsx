import React, { useEffect } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import Animated, {
  Easing,
  withTiming,
  withDelay,
} from 'react-native-reanimated';
import { useSharedValue, useAnimatedStyle } from 'react-native-reanimated';

interface FadeInProps {
  children: React.ReactNode;
  duration?: number;
  delay?: number;
  style?: ViewStyle;
  change?: any;
}

const FadeIn: React.FC<FadeInProps> = ({
  children,
  duration = 500,
  delay = 0,
  style,
  change,
}) => {
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withDelay(
      delay,
      withTiming(1, {
        duration: duration,
        easing: Easing.inOut(Easing.ease),
      })
    );
  }, [delay, duration, change]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  return (
    <Animated.View style={[animatedStyle, style]}>{children}</Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FadeIn;
