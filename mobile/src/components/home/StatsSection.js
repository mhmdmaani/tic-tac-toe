import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../../shared';
import { useSelector, useDispatch } from 'react-redux';
import { fetchStatistics } from '../../shared/store/statisticsSlice';

export default function StatsSection() {
  const stats = useSelector((state) => state.statistics.data);
  const loading = useSelector((state) => state.statistics.loading);
  const theme = useTheme();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchStatistics());
  }, [dispatch]);

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 10,
    },
    title: {
      textAlign: 'center',
      fontSize: theme.fontSize.xlarge,
      color: theme.colors.text.main,
    },
    statContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 20,
    },
    iconContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 20,
      marginBottom: 20,
    },
    indicator: {
      borderRadius: 50,
      width: 80,
      height: 80,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
    },
    indecatorContent: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    number: {
      fontSize: theme.fontSize.xxlarge,
      color: theme.colors.text.main,
      fontWeight: 'bold',
    },
  });

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.title}>Your Statistics</Text>
      <View style={styles.container}>
        {/* Wins Section */}
        <View style={styles.statContainer}>
          <View>
            <View style={styles.iconContainer}>
              <MaterialIcons
                name='emoji-emotions'
                size={80}
                color={theme.colors.green.main}
              />
            </View>
            <View
              style={[
                styles.indicator,
                { backgroundColor: theme.colors.green.main },
              ]}
            >
              {loading ? (
                <ActivityIndicator size='small' color='#fff' />
              ) : (
                <View style={styles.indecatorContent}>
                  <Text style={styles.number}>{stats?.stats?.wins}</Text>
                  <Text> Wins</Text>
                </View>
              )}
            </View>
          </View>
        </View>

        {/* Losses Section */}
        <View style={styles.statContainer}>
          <View>
            <View style={styles.iconContainer}>
              <MaterialIcons
                name='mood-bad'
                size={80}
                color={theme.colors.red.main}
              />
            </View>
            <View
              style={[
                styles.indicator,
                { backgroundColor: theme.colors.red.main },
              ]}
            >
              {loading ? (
                <ActivityIndicator size='small' color='#fff' />
              ) : (
                <View style={styles.indecatorContent}>
                  <Text style={styles.number}>{stats?.stats?.losses}</Text>
                  <Text>Losses</Text>
                </View>
              )}
            </View>
          </View>
        </View>

        {/* Draws Section */}
        <View style={styles.statContainer}>
          <View>
            <View style={styles.iconContainer}>
              <MaterialIcons
                name='sentiment-neutral'
                size={80}
                color={theme.colors.yellow.main}
              />
            </View>
            <View
              style={[
                styles.indicator,
                { backgroundColor: theme.colors.yellow.main },
              ]}
            >
              {loading ? (
                <ActivityIndicator size='small' color='#fff' />
              ) : (
                <View style={styles.indecatorContent}>
                  <Text style={styles.number}>{stats?.stats?.draws}</Text>
                  <Text>Draws</Text>
                </View>
              )}
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
