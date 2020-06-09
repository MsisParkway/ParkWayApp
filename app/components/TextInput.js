import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  ImageBackground,
  Button,
  TouchableOpacity,
} from 'react-native';

class CustomTextInput extends React.Component {
  render() {
    return (
      <TextInput
        {...this.props}
        style={{
          borderWidth: 1,
          borderColor: 'lightgrey',
          color: 'black',
          width: 'auto',
        }}
      />
    );
  }
}

export default CustomTextInput;
