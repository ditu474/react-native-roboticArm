import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import DevicesScreen from './src/components/Devices';
import Form from './src/components/Form';
import DeviceContext from './src/context/device';

const App = () => {
  const {device} = React.useContext(DeviceContext);

  return (
    <SafeAreaView>
      <View style={styles.main}>
        {!!device && <Form />}
        {!device && <DevicesScreen />}
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
