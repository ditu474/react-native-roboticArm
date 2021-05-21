import {Formik} from 'formik';
import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import DeviceContext from '../../context/device';

export default function Form() {
  const {device, disconnectDevice} = React.useContext(DeviceContext);

  const sendMessage = ({baseAngle, leftAngle, rightAngle, gripperAngle}) => {
    const json = JSON.stringify({
      baseAngle,
      leftAngle,
      rightAngle,
      gripperAngle,
    });
    device.write(`${json}#`);
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{
          baseAngle: '',
          leftAngle: '',
          rightAngle: '',
          gripperAngle: '',
        }}
        onSubmit={values => sendMessage(values)}>
        {({handleChange, handleBlur, handleSubmit, values}) => (
          <View>
            <TextInput
              onChangeText={handleChange('baseAngle')}
              onBlur={handleBlur('baseAngle')}
              value={values.baseAngle}
              placeholder="Base Angle"
              style={styles.input}
              keyboardType="numeric"
            />
            <TextInput
              onChangeText={handleChange('leftAngle')}
              onBlur={handleBlur('leftAngle')}
              value={values.leftAngle}
              placeholder="Left Angle"
              style={styles.input}
              keyboardType="numeric"
            />
            <TextInput
              onChangeText={handleChange('rightAngle')}
              onBlur={handleBlur('rightAngle')}
              value={values.rightAngle}
              placeholder="Right Angle"
              style={styles.input}
              keyboardType="numeric"
            />
            <TextInput
              onChangeText={handleChange('gripperAngle')}
              onBlur={handleBlur('gripperAngle')}
              value={values.gripperAngle}
              placeholder="Gripper Angle"
              style={styles.input}
              keyboardType="numeric"
            />
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text>Send Data</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
      <TouchableOpacity style={styles.button} onPress={disconnectDevice}>
        <Text>Diconnect</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    marginVertical: 5,
  },
  button: {
    marginVertical: 5,
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: '#11d9ff',
    elevation: 3,
    borderRadius: 8,
  },
});
