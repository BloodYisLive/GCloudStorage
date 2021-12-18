/* eslint-disable prettier/prettier */
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './app/redux/store';
import { StackNavigation } from './app/navigations';

const App = () => {
  return (
    <Provider store={store}>
      <StackNavigation />
    </Provider>
  );
};

export default App;
