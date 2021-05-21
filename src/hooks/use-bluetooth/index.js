import React from 'react';
import RNBluetoothClassic from 'react-native-bluetooth-classic';
import requestAccessFineLocationPermission from '../../utils/location-permission';

const ENABLE_BLUETOOTH = 'ENABLE_BLUETOOTH';
const DISABLE_BLUETOOTH = 'DISABLE_BLUETOOTH';
const ERROR = 'ERROR';
const START_SEARCH = 'START_SEARCH';
const SEARCH_ENDED = 'SEARCH_ENDED';

const bluetoothReducer = (state, action) => {
  switch (action.type) {
    case ENABLE_BLUETOOTH:
      return {
        ...state,
        isBluetoothEnabled: true,
      };
    case DISABLE_BLUETOOTH:
      return {
        ...state,
        isBluetoothEnabled: false,
      };
    case ERROR:
      return {
        ...state,
        error: action.error,
      };
    case START_SEARCH:
      return {
        ...state,
        isSearching: true,
        devices: [],
      };
    case SEARCH_ENDED:
      return {
        ...state,
        isSearching: false,
        devices: action.devices || [],
      };
    default:
      return {...state};
  }
};

export default function useBluetooth() {
  const [bluetoothState, dispatch] = React.useReducer(bluetoothReducer, {
    isBluetoothEnabled: false,
    devices: [],
    isSearching: false,
    error: '',
  });

  React.useEffect(() => {
    RNBluetoothClassic.isBluetoothEnabled().then(val => {
      if (val) {
        dispatch({type: ENABLE_BLUETOOTH});
      } else {
        dispatch({type: DISABLE_BLUETOOTH});
      }
    });
    const enabledSubscription = RNBluetoothClassic.onBluetoothEnabled(() => {
      dispatch({type: ENABLE_BLUETOOTH});
    });
    const disabledSubscription = RNBluetoothClassic.onBluetoothDisabled(() => {
      dispatch({type: DISABLE_BLUETOOTH});
    });

    return () => {
      enabledSubscription.remove();
      disabledSubscription.remove();
    };
  }, []);

  const findDevices = React.useCallback(async () => {
    dispatch({type: ERROR, error: ''});
    try {
      let granted = await requestAccessFineLocationPermission();
      if (!granted) {
        dispatch({
          type: ERROR,
          error: 'Access fine location was not granted',
        });
      }

      dispatch({type: START_SEARCH});
      let unpairedDevices = await RNBluetoothClassic.startDiscovery(); //TODO: CHANGE DOCS OF LIBRARY
      dispatch({type: SEARCH_ENDED, devices: unpairedDevices});
    } catch (err) {
      dispatch({
        type: ERROR,
        error: `Error finding devices: ${err.message}`,
      });
    }
  }, []);

  const cancelFind = async () => {
    if (bluetoothState.isSearching) {
      try {
        await RNBluetoothClassic.cancelDiscovery();
        dispatch({type: SEARCH_ENDED});
      } catch (err) {
        dispatch({
          type: ERROR,
          error: `Error occurred while attempting to cancel discover devices: ${err}`,
        });
      }
    }
  };

  return {
    ...bluetoothState,
    findDevices,
    cancelFind,
  };
}
