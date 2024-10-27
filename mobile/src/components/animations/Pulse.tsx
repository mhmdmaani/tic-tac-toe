import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  Easing,
  withDelay,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { useSharedValue, useAnimatedStyle } from 'react-native-reanimated';

interface PulseProps {
  children: React.ReactNode;
  numberOfPulses?: number;
  delay?: number;
  style?: object;
  toSize?: number;
}

const Pulse: React.FC<PulseProps> = ({
  children,
  numberOfPulses = 6,
  delay = 0,
  style,
  toSize = 1.2,
}) => {
  const scale = useSharedValue(1);

  useEffect(() => {
    scale.value = withDelay(
      delay,
      withRepeat(
        withTiming(toSize, {
          duration: 500,
          easing: Easing.inOut(Easing.ease),
        }),
        numberOfPulses,
        true // This makes the animation reverse after reaching the end
      )
    );
  }, [delay, numberOfPulses]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  return (
    <Animated.View style={[styles.container, style, animatedStyle]}>
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

export default Pulse;
