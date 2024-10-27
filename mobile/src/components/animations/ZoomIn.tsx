import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  Easing,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import { useSharedValue, useAnimatedStyle } from 'react-native-reanimated';

interface ZoomInProps {
  children: React.ReactNode;
  from?: number;
  to?: number;
  delay?: number;
  duration?: number;
  start?: boolean;
}

const ZoomIn: React.FC<ZoomInProps> = ({
  children,
  from = 0,
  to = 1,
  delay = 0,
  duration = 500,
  start = true,
}) => {
  const scale = useSharedValue(from);

  useEffect(() => {
    if (start) {
      scale.value = withDelay(
        delay,
        withTiming(to, {
          duration: duration,
          easing: Easing.inOut(Easing.ease),
        })
      );
    }
  }, [delay, from, to, duration, start]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      {children}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ZoomIn;
