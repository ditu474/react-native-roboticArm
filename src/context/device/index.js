import React from 'react';

const DeviceContext = React.createContext({
  device: null,
  connectToDevice: device => {},
  disconnectDevice: () => {},
});

export const DeviceProvider = ({children}) => {
  const [device, setDevice] = React.useState(null);

  const connectToDevice = async newDevice => {
    try {
      await newDevice.connect();
      setDevice(newDevice);
    } catch (error) {
      console.error(`Connection failed: ${error.message}`);
      setDevice(null);
    }
  };

  const disconnectDevice = async () => {
    try {
      await device.disconnect();
    } catch (error) {
      console.error(`Disconnect failed: ${error.message}`);
    }
    setDevice(null);
  };

  const ctxValue = {
    device,
    connectToDevice,
    disconnectDevice,
  };

  return (
    <DeviceContext.Provider value={ctxValue}>{children}</DeviceContext.Provider>
  );
};

export default DeviceContext;
