import React from 'react';
import {Component} from 'react';
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

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {connect} from 'react-redux';
import {createAppContainer, createStackNavigator} from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';
import CustomButton from '../components/Button';
import Toast from 'react-native-simple-toast';
//import CustomTextInput from '../components/TextInput';

class Registration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
      emailid: '',
      mobile: '',
      dob: '',
      username: '',
      password: '',
      usertype: 'G',
      showDisplay: false,
      count: 0,
      color: 'red',
      value: 'Enter required Data',
    };
  }

  postData = () => {
    try {
      fetch(
        'http://parkwayapi-env-2.eba-xgm5ffvk.us-east-2.elasticbeanstalk.com/register',
        {
          //fetch('http://10.0.0.153:5000/login', {
          method: 'POST',
          mode: 'cors',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            emailid: this.state.emailid,
            mobile: this.state.mobile,
            dob: this.state.dob,
            username: this.state.username,
            password: this.state.password,
            usertype: this.state.usertype,
          }),
        },
      )
        .then(response => {
          const statusCode = response.status;
          const promiseofdata = response.json();
          return Promise.all([statusCode, promiseofdata]);
        })
        .then(res => {
          console.log('response', res);
          const statusCode = res[0];
          const data = res[1];
          console.log(data);

          if (statusCode === 500) {
            Toast.show('Something went wrong we are looking into it!');
          } else if (statusCode === 200) {
            Toast.show('Registered Successfully');
            this.props.setLoginId(data.message);
            this.props.navigation.navigate('tabScreen');
          } else if (statusCode === 400) {
            Toast.show('Invalid user credentials');
          } else {
            Toast.show('Something went terribly wrong.....we are on it!');
          }
        });
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    return (
      <ImageBackground
        source={require('../assets/parkwayRegistration.jpg')}
        style={styles.backgroundImage}>
        <View style={styles.registrationDetails}>
          <Text style={styles.welcome}>ParkWay</Text>

          <TextInput
            placeholder="First name"
            style={styles.input}
            value={this.state.firstname}
            onChangeText={text => {
              this.setState({firstname: text});
            }}
          />

          <TextInput
            placeholder="Last name"
            style={styles.input}
            value={this.state.lastname}
            onChangeText={text => {
              this.setState({lastname: text});
            }}
          />

          <TextInput
            placeholder="Username"
            style={styles.input}
            value={this.state.username}
            onChangeText={text => {
              this.setState({username: text});
            }}
          />

          <TextInput
            placeholder="Email"
            style={styles.input}
            value={this.state.emailid}
            onChangeText={text => {
              this.setState({emailid: text});
            }}
          />

          <TextInput
            placeholder="Mobile Number"
            style={styles.input}
            value={this.state.mobile}
            onChangeText={text => {
              this.setState({mobile: text});
            }}
          />

          <TextInput
            placeholder="Date of Birth (yyyy-mm-dd)"
            style={styles.input}
            value={this.state.dob}
            onChangeText={text => {
              this.setState({dob: text});
            }}
          />

          <TextInput
            secureTextEntry={true}
            style={styles.input}
            placeholder="Enter Password"
            value={this.state.password}
            onChangeText={text => {
              this.setState({password: text});
            }}
          />

          <CustomButton
            title="Sign Up"
            functionOnClick={() => {
              //this.props.navigation.navigate('search');
              //this.props.navigation.navigate('tabScreen');
              this.postData();
            }}
          />

          {/* <Button
            title="Sign up"
            onPress={() => this.props.navigation.navigate('search')}
          /> */}
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  registrationDetails: {
    width: '80%',
    height: '80%',
    backgroundColor: 'rgba(255,255,255,.7)',
    alignSelf: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  search_header: {
    height: '30%',
    justifyContent: 'center',
    paddingHorizontal: 5,
  },
  search_input_box: {
    height: '100%',
    backgroundColor: 'rgba(255,255,255,.7)',
    flexDirection: 'row',
    padding: 5,
    alignItems: 'center',
  },
  search_icon: {
    fontSize: 30,
  },

  search_check_in_check_out_container: {
    height: '10%',
    width: '100%',
    backgroundColor: 'rgba(255,255,255,.7)',
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },

  search_check_in_check_out_sub_container: {
    flex: 1,
  },

  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
    opacity: 80,
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },

  welcome: {
    fontSize: 50,
    textAlign: 'center',
    margin: 10,
    color: 'rgba(69,145,130,10)',
  },
  input: {
    marginLeft: 20,
    marginRight: 20,
    textAlign: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'rgba(69,145,130,10)',
  },
  search_date_time_button: {
    width: '50%',
    height: '30%',
    textAlign: 'center',
    borderRadius: 30,
    borderWidth: 1,
    borderColor: 'rgba(69,145,130,10)',
    justifyContent: 'center',
    paddingHorizontal: 5,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});
const mapDispatchToProps = dispatch => {
  return {
    setLoginId: loginId => {
      dispatch({type: 'SET_LOGIN_ID', payload: {loginId}});
    },
  };
};
export default connect(
  null,
  mapDispatchToProps,
)(Registration);
