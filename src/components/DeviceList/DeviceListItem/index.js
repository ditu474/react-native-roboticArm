import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import useBluetooth from '../../../hooks/use-bluetooth';

export default function DeviceListItem({device}) {
  const {selectDevice} = useBluetooth();

  const onPressHandler = () => {
    selectDevice(device);
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
