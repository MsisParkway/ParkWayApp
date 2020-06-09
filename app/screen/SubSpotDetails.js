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

import {createAppContainer, createStackNavigator} from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';
import CustomButton from '../components/Button';
//import CustomTextInput from '../components/TextInput';

class SubSpotDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      SpotID: '',
      SpotName: '',
      ParkingFeePerHour: '',
      isLoading: true,
    };
  }

  handlePicker = datetime => {
    const whichPicker = this.state.whichPicker;
    if (whichPicker == 'checkin') {
      this.setState({
        isVisible: false,
        AvailStartDateTime: moment(datetime).format('MMMM, Do YYYY HH:mm'),
      });
    } else {
      this.setState({
        isVisible: false,
        AvailEndDateTime: moment(datetime).format('MMMM, Do YYYY HH:mm'),
      });
    }
  };

  hidePicker = () => {
    this.setState({
      isVisible: false,
    });
  };

  showPicker = param => {
    this.setState({
      isVisible: true,
      whichPicker: param,
    });
  };

  componentDidMount() {
    fetch(
      'http://parkwayapi-env-2.eba-xgm5ffvk.us-east-2.elasticbeanstalk.com/host_further',
    )
      .then(response => response.json())
      .then(Responsejson => {
        this.setState({responsedata: Responsejson});
      })
      .catch(error => console.error(error))
      .finally(() => {
        this.setState({isLoading: false});
      });
  }

  postData = () => {
    try {
      fetch(
        'http://parkwayapi-env-2.eba-xgm5ffvk.us-east-2.elasticbeanstalk.com/spot_description',
        {
          //fetch('http://10.0.0.153:5000/login', {
          method: 'POST',
          mode: 'cors',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            SpotID: this.state.SpotID,
            SpotName: this.state.SpotName,
            ParkingFeePerHour: this.state.ParkingFeePerHour,
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

  /*postData = () => {
    try {
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
            hid: this.state.hid,
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
  };*/

  render() {
    const {responsedata, isLoading} = this.state;

    if (!responsedata) {
      return <Text>Loading</Text>;
    }

    const results = JSON.parse(responsedata.result);

    return (
      <ImageBackground
        source={require('../assets/parkwayRegistration.jpg')}
        style={styles.backgroundImage}>
        <View style={styles.registrationDetails}>
          <Text style={styles.appText}>Some details for the parking spots</Text>

          <TextInput
            placeholder="SpotName"
            style={styles.input}
            value={this.state.SpotName}
            onChangeText={text => {
              this.setState({SpotName: text});
            }}
          />

          <TextInput
            placeholder="Fee per hour"
            style={styles.input}
            value={this.state.ParkingFeePerHour}
            onChangeText={text => {
              this.setState({ParkingFeePerHour: text});
            }}
          />

          <View style={styles.container}>
            <View>
              <CustomButton
                title="Register Parking spot"
                functionOnClick={() => {
                  this.setState(
                    {
                      SpotID: results,
                    },
                    () => {
                      this.postData();
                    },
                  );
                  this.props.navigation.navigate('hosthome');
                  //this.props.navigation.navigate('tabScreen');
                }}
              />
            </View>
            <View>
              <CustomButton
                title="Add another spot"
                functionOnClick={() => {
                  this.postData();
                  this.props.navigation.navigate('subspotdetails');
                  //this.props.navigation.navigate('tabScreen');
                }}
              />
            </View>
          </View>
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
    flexDirection: 'row',
    width: '50%',
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

export default SubSpotDetails;
