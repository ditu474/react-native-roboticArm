/**
 * @format
 */

import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {DeviceProvider} from './src/context/device';

const Main = () => {
  return (
    <DeviceProvider>
      <App />
    </DeviceProvider>
  );
};

AppRegistry.registerComponent(appName, () => Main);
