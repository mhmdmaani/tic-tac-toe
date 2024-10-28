import { Provider } from 'react-redux';
import { store } from '../store/store.js';

function ReduxProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}

export default ReduxProvider;
