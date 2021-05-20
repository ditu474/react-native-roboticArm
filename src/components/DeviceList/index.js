import React from 'react';
import {FlatList} from 'react-native';
import DeviceListItem from './DeviceListItem';

export default function DeviceList({devices}) {
  return (
    <FlatList
      data={devices}
      renderItem={({item}) => <DeviceListItem device={item} />}
      keyExtractor={device => device.address}
    />
  );
}
