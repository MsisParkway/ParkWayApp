import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';

export default class Login extends Component {
  render() {
    return (
      <View style={style.container}>
        <TextInput placeholder="Email" style={style.input} />
        <TextInput placeholder="Password" style={style.input} />

        <TouchableOpacity style={style.buttonContainer}>
          <Text style={style.buttonText}>LOGIN</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    padding: 20,
    flex: 0.7,
  },

  input: {
    height: 40,
    width: 300,
    backgroundColor: '#c3d7db',
    textAlign: 'center',
    marginBottom: 20,
    color: '#FFF',
  },

  buttonContainer: {
    backgroundColor: '#8cc2c2',
    paddingVertical: 10,
  },

  buttonText: {
    textAlign: 'center',
    color: '#FFF',
  },
});
