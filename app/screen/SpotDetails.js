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
//import CustomTextInput from '../components/TextInput';

class SpotDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showDisplay: false,
      count: 0,
      color: 'red',
      value: 'Enter required Data',
      hid: '',
      pcity: '',
      sAddress: '',
      pstate: '',
      pcountry: '',
      pzcode: '',
    };
  }

  postData = () => {
    try {
      const loginId = this.props.account.loginId;
      console.log('prepayment gid', this.props.account.loginId);
      fetch(
        'http://parkwayapi-env-2.eba-xgm5ffvk.us-east-2.elasticbeanstalk.com/host_spot',
        {
          //fetch('http://10.0.0.153:5000/login', {
          method: 'POST',
          mode: 'cors',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            hid: this.props.account.loginId,
            pcity: this.state.pcity,
            sAddress: this.state.sAddress,
            pstate: this.state.pstate,
            pcountry: this.state.pcountry,
            pzcode: this.state.pzcode,
          }),
        },
      ).then(response => {
        const statusCode = response.status;

        if (statusCode === 500) {
          Toast.show('Something went wrong we are looking into it!');
        } else if (statusCode === 200) {
          Toast.show('Your parking spot registered Successfully');
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
          <Text style={styles.appText}>
            Earn some money by hosting your spare parking
          </Text>

          <TextInput
            placeholder="Address"
            style={styles.input}
            value={this.state.sAddress}
            onChangeText={text => {
              this.setState({sAddress: text});
            }}
          />

          <TextInput
            placeholder="City"
            style={styles.input}
            value={this.state.pcity}
            onChangeText={text => {
              this.setState({pcity: text});
            }}
          />

          <TextInput
            placeholder="State"
            style={styles.input}
            value={this.state.pstate}
            onChangeText={text => {
              this.setState({pstate: text});
            }}
          />

          <TextInput
            placeholder="Country"
            style={styles.input}
            value={this.state.pcountry}
            onChangeText={text => {
              this.setState({pcountry: text});
            }}
          />

          <TextInput
            placeholder="Pincode"
            style={styles.input}
            value={this.state.pzcode}
            onChangeText={text => {
              this.setState({pzcode: text});
            }}
          />

          <CustomButton
            title="Register Parking spot"
            functionOnClick={() => {
              this.postData();
              this.props.navigation.navigate('subspotdetails');
              //this.props.navigation.navigate('tabScreen');
            }}
          />
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
    opacity: 80,
  },

  registrationDetails: {
    width: '80%',
    height: '80%',
    backgroundColor: 'rgba(255,255,255,.7)',
    alignSelf: 'center',
    justifyContent: 'center',
    padding: 20,
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

  appText: {
    fontSize: 20,
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
const mapStateToProps = state => ({
  account: state.account,
});
export default connect(
  mapStateToProps,
  null,
)(SpotDetails);
