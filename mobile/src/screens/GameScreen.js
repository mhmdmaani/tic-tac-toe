import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Dimensions,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { AntDesign, FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { useGame, useTheme } from '../shared';

const windowWidth = Dimensions.get('window').width;
const cellSize = (windowWidth * 0.9) / 3;

export default function Game() {
  const theme = useTheme();
  const route = useRoute();
  const navigation = useNavigation();
  const { id } = route.params;
  const { status, board, isDone, handleCellClick } = useGame(id);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.bg.main,
    },
    gameBoard: {
      width: windowWidth * 0.9,
      height: windowWidth * 0.9,
      flexDirection: 'row',
      flexWrap: 'wrap',
      backgroundColor: theme.colors.bg.card,
      borderRadius: 10,
      elevation: 5,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    },
    cell: {
      width: cellSize,
      height: cellSize,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#e0e0e0',
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 10,
      alignItems: 'center',
      elevation: 5,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    },
    iconContainer: {
      marginVertical: 20,
    },
    modalText: {
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 20,
    },
    button: {
      backgroundColor: '#007AFF',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
      marginTop: 20,
    },
    buttonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.gameBoard}>
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <TouchableOpacity
              key={`${rowIndex}-${colIndex}`}
              style={styles.cell}
              onPress={() => handleCellClick(rowIndex, colIndex)}
            >
              {cell === 0 ? null : cell === -1 ? (
                <AntDesign
                  name='close'
                  size={cellSize * 0.6}
                  color={theme.colors.primary.main}
                />
              ) : (
                <FontAwesome
                  name='circle-o'
                  size={cellSize * 0.6}
                  color={theme.colors.yellow.main}
                />
              )}
            </TouchableOpacity>
          ))
        )}
      </View>
      <Modal visible={isDone} transparent={true} animationType='fade'>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.iconContainer}>
              {status === 'x wins' ? (
                <FontAwesome5
                  name='grin-stars'
                  size={cellSize}
                  color={theme.colors.green.main}
                />
              ) : status === 'o wins' ? (
                <FontAwesome5
                  name='frown'
                  size={cellSize}
                  color={theme.colors.red.main}
                />
              ) : (
                <FontAwesome5
                  name='meh'
                  size={cellSize}
                  color={theme.colors.yellow.main}
                />
              )}
            </View>
            <Text style={styles.modalText}>
              {status === 'x wins'
                ? 'Congratulations! You won!'
                : status === 'o wins'
                ? 'You lost!'
                : "It's a draw!"}
            </Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('home')}
            >
              <Text style={styles.buttonText}>Go to Home</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
