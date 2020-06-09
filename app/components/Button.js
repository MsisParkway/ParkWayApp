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

class CustomButton extends React.Component {
  render() {
    return (
      <TouchableOpacity
        onPress={this.props.functionOnClick}
        style={{
          //backgroundColor: 'white',
          //color: 'blue',
          //height: 30,
          // width: 'auto',
          // padding: 30,
          // alignItems: 'center',
          backgroundColor: '#DDDDDD',
          justifyContent: 'center',
          backgroundColor: 'rgba(69,145,130,10)',
          borderRadius: 5,
          paddingVertical: 10,
          paddingHorizontal: 40,
          alignSelf: 'center',
          marginVertical: 40,
          marginHorizontal: 5,
        }}>
        <Text>{this.props.title}</Text>
      </TouchableOpacity>
    );
  }
}
export default CustomButton;
