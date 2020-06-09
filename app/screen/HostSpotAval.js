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
  ActivityIndicator,
  FlatList,
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
import call from 'react-native-phone-call';

class HostSpotAval extends React.Component {
  constructor(props) {
    super(props);
    const params = this.props.navigation.state.params;

    this.state = {
      responsedata: params.data,
      isLoading: true,
    };
  }

  /*componentDidMount() {
    fetch(
      'https://5e991ed75eabe7001681c770.mockapi.io/search_spot/spotId/calculatePrice',
    )
      .then(response => response.json())
      .then(Responsejson => {
        this.setState({
          data: Responsejson.result,
        });
      })
      .catch(error => console.error(error))
      .finally(() => {
        this.setState({isLoading: false});
      });
  }*/

  postData = () => {
    try {
      fetch(
        'http://parkwayapi-env-2.eba-xgm5ffvk.us-east-2.elasticbeanstalk.com/booking',
        {
          //fetch('http://10.0.0.153:5000/login', {
          method: 'POST',
          mode: 'cors',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            SdID: this.state.SdID,
            SpotName: this.state.SpotName,
            SpotAddress: this.state.SpotAddress,
            P_City: this.state.P_City,
            parkingfeeperhour: this.state.parkingfeeperhour,
          }),
        },
      )
        .then(response => {
          const statusCode = response.status;
          const promiseofdata = response.json();
          return Promise.all([statusCode, promiseofdata]);
          /* if (statusCode === 500) {
          Toast.show('Something went wrong we are looking into it!');
        } else if (statusCode === 200) {
          Toast.show('Registered Successfully');
          this.props.navigation.navigate('tabScreen');
        } else if (statusCode === 400) {
          Toast.show('Invalid user credentials');
        } else {
          Toast.show('Something went terribly wrong.....we are on it!');
        } */
        })
        .then(res => {
          const responseCode = res[0];
          const data = res[1];
          console.log('data on booking page after hitting api: ', data);

          if (responseCode == 200) {
            this.props.navigation.navigate('enteravailability', {data});
          }
        });
    } catch (e) {
      console.log(e);
    }
  };

  postData1 = () => {
    try {
      fetch(
        'http://parkwayapi-env-2.eba-xgm5ffvk.us-east-2.elasticbeanstalk.com/view_availabilty',
        {
          //fetch('http://10.0.0.153:5000/login', {
          method: 'POST',
          mode: 'cors',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            SdID: this.state.SdID,
          }),
        },
      )
        .then(response => {
          const statusCode = response.status;
          const promiseofdata = response.json();
          return Promise.all([statusCode, promiseofdata]);
          /* if (statusCode === 500) {
          Toast.show('Something went wrong we are looking into it!');
        } else if (statusCode === 200) {
          Toast.show('Registered Successfully');
          this.props.navigation.navigate('tabScreen');
        } else if (statusCode === 400) {
          Toast.show('Invalid user credentials');
        } else {
          Toast.show('Something went terribly wrong.....we are on it!');
        } */
        })
        .then(res => {
          const responseCode = res[0];
          const data = res[1];
          console.log('data on booking page after hitting api: ', data);

          if (responseCode == 200) {
            this.props.navigation.navigate('viewavailability', {data});
          }
        });
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    const {responsedata, data, isLoading} = this.state;

    if (!responsedata) {
      return <Text>Loading</Text>;
    }

    return (
      <View style={[styles.registrationDetails, {flexDirection: 'column'}]}>
        <View style={styles.item}>
          <Text style={styles.appText}>Spot Details</Text>

          <Text style={styles.item}>Spot Name: {responsedata.SpotName}</Text>
          <Text style={styles.item}>
            Price per hour:${responsedata.parkingfeeperhour}{' '}
          </Text>
          <Text style={styles.item}>Address: {responsedata.SpotAddress}</Text>
          <Text style={styles.item}>City:{responsedata.P_City}</Text>

          <View style={styles.container}>
            <View>
              <CustomButton
                title="Enter Availability"
                functionOnClick={() => {
                  this.setState(
                    {
                      SdID: responsedata.SdID,
                      SpotName: responsedata.SpotName,
                      SpotAddress: responsedata.SpotAddress,
                      P_City: responsedata.P_City,
                      parkingfeeperhour: responsedata.parkingfeeperhour,
                    },
                    () => {
                      this.postData({responsedata});
                    },
                  );
                  //this.props.navigation.navigate('enteravailability');
                  //this.props.navigation.navigate('tabScreen');
                }}
              />
            </View>
            <View>
              <CustomButton
                title="View Availability"
                functionOnClick={() => {
                  this.setState(
                    {
                      SdID: responsedata.SdID,
                    },
                    () => {
                      this.postData1({responsedata});
                    },
                  );
                  //this.props.navigation.navigate('viewavailability');
                  //this.props.navigation.navigate('tabScreen');
                }}
              />
            </View>
          </View>
        </View>
      </View>
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
  buttonContainer: {
    backgroundColor: '#8cc2c2',
    paddingVertical: 10,
  },

  buttonText: {
    textAlign: 'center',
    color: '#FFF',
  },

  item: {
    fontSize: 20,
    padding: 10,
  },
});

export default HostSpotAval;
