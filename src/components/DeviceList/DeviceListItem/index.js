import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import DeviceContext from '../../../context/device';

export default function DeviceListItem({device}) {
  const {connectToDevice} = React.useContext(DeviceContext);

  const onPressHandler = () => {
    connectToDevice(device);
  };

  return (
    <TouchableOpacity onPress={onPressHandler} style={styles.device}>
      <View>
        <Text>Name: {device.name}</Text>
        <Text>Address: {device.address}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  device: {
    margin: 5,
    padding: 10,
    elevation: 3,
    backgroundColor: 'white',
    borderRadius: 8,
  },
});
