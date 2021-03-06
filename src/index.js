import React from 'react';
import { StatusBar } from 'react-native';

import './config/ReactotronConfig';
import { Provider } from 'react-redux';

import colors from './styles/colors';

import Routes from './routes';
import store from './store';

export default function App() {
  return (
    <Provider store={store}>
      <StatusBar barStyle="light-content" backgroundColor={colors.dark} />
      <Routes />
    </Provider>
  );
}
