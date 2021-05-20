import {PermissionsAndroid} from 'react-native';

const requestAccessFineLocationPermission = async () => {
  const granted = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    {
      title: 'Permisos para encontrar dispositivos',
      message:
        'Para poder buscar dispositivos cerca debemos saber tú ubicación',
      buttonNeutral: 'Preguntar Luego',
      buttonNegative: 'Cancelar',
      buttonPositive: 'Aceptar',
    },
  );
  return granted === PermissionsAndroid.RESULTS.GRANTED;
};

export default requestAccessFineLocationPermission;
