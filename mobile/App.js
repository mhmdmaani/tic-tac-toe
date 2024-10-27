import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { ReduxProvider, store } from './src/shared';
import Main from './src/nav/Main';
import { RootSiblingParent } from 'react-native-root-siblings';

export default function App() {
  return (
    <ReduxProvider store={store}>
      <RootSiblingParent>
        <Main />
      </RootSiblingParent>
    </ReduxProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
