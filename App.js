/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';

import Root from './app/Root';
import {Provider} from 'react-redux';

import configureStore from './app/redux/configureStore';

const store = configureStore();
const RNRedux = () => (
  <Provider store={store}>
    <Root />
  </Provider>
);
export default RNRedux;
