import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal as RNModal,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { useCreateNewSession, useTheme } from '../../shared';
import { useNavigation } from '@react-navigation/native';

export default function StartNewButton() {
  const theme = useTheme();
  const navigation = useNavigation();
  const {
    openForm,
    setOpenForm,
    selectedPlayer,
    setSelectedPlayer,
    onStartGame,
  } = useCreateNewSession({
    onSuccess: (data) => {
      setOpenForm(false);
      navigation.navigate('game', { id: data.id });
    },
    onError: (error) => {},
  });

  const styles = StyleSheet.create({
    mainContainer: {
      paddingHorizontal: 20,
    },
    container: {
      paddingTop: 20,
      paddingBottom: 20,
      justifyContent: 'center',
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
      backgroundColor: theme.colors.bg.main,
      padding: 20,
      borderRadius: 10,
    },
    label: {
      fontSize: 24,
      marginBottom: 20,
      textAlign: 'center',
      color: theme.colors.text.main,
    },
    chooseContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 20,
      marginBottom: 20,
    },
    selectItem: {
      padding: 20,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: 'gray',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 10,
      width: 120,
      backgroundColor: theme.colors.bg.card,
    },
    itemText: {
      fontSize: 14,
      color: theme.colors.text.main,
    },
    primaryButton: {
      backgroundColor: theme.colors.primary.main,
      paddingVertical: 15,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 8,
    },
    buttonText: {
      color: theme.colors.white.main,
      fontSize: theme.fontSize.regular,
      fontWeight: 'bold',
    },
    buttonsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: 10,
    },
    cancelButton: {
      backgroundColor: theme.colors.red.light,
      paddingVertical: 15,
      paddingHorizontal: 20,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 8,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => setOpenForm(true)}
        >
          <Text style={styles.buttonText}>Start New Game</Text>
        </TouchableOpacity>
      </View>

      <RNModal
        transparent={true}
        visible={openForm}
        animationType='slide'
        onRequestClose={() => setOpenForm(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.label}>Who will Start The Game?</Text>

            <View style={styles.chooseContainer}>
              <TouchableOpacity
                onPress={() => setSelectedPlayer('x')}
                style={[
                  styles.selectItem,
                  selectedPlayer === 'x' && { borderColor: 'blue' },
                ]}
              >
                <MaterialIcons
                  name='close'
                  size={50}
                  color={theme.colors.primary.main}
                />
                <Text style={styles.itemText}>You</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setSelectedPlayer('o')}
                style={[
                  styles.selectItem,
                  selectedPlayer === 'o' && { borderColor: 'blue' },
                ]}
              >
                <FontAwesome
                  name='circle-o'
                  size={50}
                  color={theme.colors.yellow.main}
                />
                <Text style={styles.itemText}>Computer</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setOpenForm(false)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ ...styles.primaryButton, flex: 1 }}
                onPress={onStartGame}
              >
                <Text style={styles.buttonText}>Start New Game</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </RNModal>
    </View>
  );
}
