import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import DeviceList from '../../components/DeviceList';
import useBluetooth from '../../hooks/use-bluetooth';

export default function Devices() {
  const {
    isSearching,
    cancelFind,
    findDevices,
    isBluetoothEnabled,
    error,
    devices,
  } = useBluetooth();

  const toggleSearch = isSearching ? () => cancelFind() : () => findDevices();

  if (!isBluetoothEnabled) {
    return (
      <View>
        <Text>You Must Enable Bluetooth</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {!!error && <Text>{error}</Text>}
      <Button
        block
        onPress={toggleSearch}
        title={isSearching ? 'Searching (cancel)...' : 'Search Devices'}
      />
      {devices.length > 0 && (
        <Text>{`Found ${devices.length} unpaired devices.`}</Text>
      )}
      {devices.length > 0 && <DeviceList devices={devices} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
});
