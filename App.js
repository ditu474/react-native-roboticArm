import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import useBluetooth from './src/hooks/use-bluetooth';
import DevicesScreen from './src/screens/Devices';

const App = () => {
  const {device} = useBluetooth();

  return (
    <SafeAreaView>
      {!!device && <Text>{device.address}</Text>}
      <View style={styles.main}>
        <DevicesScreen />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#eee',
    paddingTop: 10,
    paddingHorizontal: 10,
    height: '100%',
  },
});

export default App;
