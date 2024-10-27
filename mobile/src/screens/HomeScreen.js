import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import HomeHeader from '../components/home/HomeHeader';
import { useTheme } from '../shared';
import StatsSection from '../components/home/StatsSection';
import StartNewButton from '../components/home/StartNewButton';
import { useProtected } from '../hooks/useProtected';
const HomeScreen = () => {
  useProtected();
  const theme = useTheme();
  console.log(theme);
  const styles = StyleSheet.create({
    mainContainer: {
      flex: 1,
      backgroundColor: theme.colors.bg.main,
    },
    container: {
      flex: 1,
      backgroundColor: theme.colors.bg.main,
    },
    statsContainer: {
      flex: 1,
      justifyContent: 'center',
    },
  });
  return (
    <View style={styles.mainContainer}>
      <SafeAreaView style={styles.container}>
        <HomeHeader />
        <View style={styles.statsContainer}>
          <StatsSection />
        </View>
        <StartNewButton />
      </SafeAreaView>
    </View>
  );
};

export default HomeScreen;
