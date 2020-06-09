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

class PageButton extends React.Component {
  render() {
    <Button title={this.props.title} onPress={this.props.functionOnClick} />;
  }
}

export default PageButton;
