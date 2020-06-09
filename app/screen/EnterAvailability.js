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

class EnterAvailability extends React.Component {
  constructor(props) {
    super(props);
    const params = this.props.navigation.state.params;

    this.state = {
      responsedata: params.data,
      isLoading: true,
    };
  }

  handlePicker = datetime => {
    const whichPicker = this.state.whichPicker;
    if (whichPicker == 'checkin') {
      this.setState({
        isVisible: false,
        AvailableStartDateTime: moment(datetime).format('MMMM, Do YYYY HH:mm '),
      });
    } else {
      this.setState({
        isVisible: false,
        AvailableEndDateTime: moment(datetime).format('MMMM, Do YYYY HH:mm '),
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
        'http://parkwayapi-env-2.eba-xgm5ffvk.us-east-2.elasticbeanstalk.com/spot_availability',
        {
          //fetch('http://10.0.0.153:5000/login', {
          method: 'POST',
          mode: 'cors',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            Sdid: this.state.SdID,
            AvailableStartDateTime: this.state.AvailableStartDateTime,
            AvailableEndDateTime: this.state.AvailableEndDateTime,
          }),
        },
      ).then(response => {
        const statusCode = response.status;

        if (statusCode === 500) {
          Toast.show('Something went wrong we are looking into it!');
        } else if (statusCode === 200) {
          Toast.show('Availabilty entered Successfully');
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
    const {responsedata, data, isLoading} = this.state;

    const args = {
      number: '+14086462243', // String value with the number to call
      prompt: true, // Optional boolean property. Determines if the user should be prompt prior to the call
    };

    return (
      <View style={[styles.registrationDetails, {flexDirection: 'column'}]}>
        <View style={styles.item}>
          <Text style={styles.appText}>Please Enter Availabilty</Text>
          <Text style={styles.item}>Spot Name: {responsedata.SpotName}</Text>

          <View style={styles.container}>
            {/* to show selected date and time in the field */}

            <TouchableOpacity
              onPress={() => this.showPicker('checkin')}
              style={styles.search_date_time_button}>
              <Text>
                {this.state.AvailableStartDateTime || 'Avaliable Start'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => this.showPicker('checkout')}
              style={styles.search_date_time_button}>
              <Text>{this.state.AvailableEndDateTime || 'Avaliable End'}</Text>
            </TouchableOpacity>

            <DateTimePicker
              isVisible={this.state.isVisible}
              onConfirm={this.handlePicker}
              onCancel={this.hidePicker}
              mode={'datetime'}
              is24Hour={true}
            />
          </View>

          <CustomButton
            title="Enter Availabilty"
            functionOnClick={() => {
              this.setState(
                {
                  SdID: responsedata.SdID,
                },
                () => {
                  this.postData();
                },
              );
              //call(args).catch(console.error);
              //this.props.navigation.navigate('tabScreen');
            }}
          />
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
    width: '80%',
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
    width: '60%',
    height: '50%',
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

export default EnterAvailability;
