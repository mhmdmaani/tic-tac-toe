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
