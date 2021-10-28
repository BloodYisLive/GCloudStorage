/* eslint-disable prettier/prettier */
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './app/redux/store';
import { RootNavigation } from './app/components';
const App = () => {
  return (
    <Provider store={store}>
      <RootNavigation />
    </Provider>
  );
};

export default App;
