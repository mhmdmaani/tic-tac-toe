import React, { useEffect } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withTiming,
  withRepeat,
  withSpring,
  withDecay,
  withDelay,
} from 'react-native-reanimated';

const VibrateAnimation = ({
  times = -1,
  duration = 500,
  children,
  start = true,
  delay = 0,
}: {
  times?: number;
  duration?: number;
  children?: React.ReactNode;
  start?: boolean;
  delay?: number;
}) => {
  const translateX = useSharedValue(0);

  const startVibration = () => {
    translateX.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(-5, { duration: duration }),
          withTiming(5, { duration: duration - 100 })
        ),
        times, // Infinite repetitions
        true // Reverse the animation
      )
    );
  };

  useEffect(() => {
    if (start) {
      startVibration();
    }
  }, [start]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  return (
    <Animated.View style={[styles.box, animatedStyle]}>
      {children}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {},
});

export default VibrateAnimation;
