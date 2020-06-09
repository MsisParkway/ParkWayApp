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
import CustomButton from '../components/Button';
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
//import { TouchableOpacity } from 'react-native-gesture-handler';
//import { createStackNavigator } from 'react-navigation-stack';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisibleCheckIn: false,
      isVisibleCheckOut: false,
      whichPicker: '',
      P_Zipcode: '',
      P_City: '',
      AvailStartDateTime: '',
      AvailEndDateTime: '',
    };
  }

  handlePicker = datetime => {
    const whichPicker = this.state.whichPicker;
    if (whichPicker == 'checkin') {
      this.setState({
        isVisible: false,
        AvailStartDateTime: moment(datetime).format('MMMM, Do YYYY HH:mm '),
      });
    } else {
      this.setState({
        isVisible: false,
        AvailEndDateTime: moment(datetime).format('MMMM, Do YYYY HH:mm '),
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

  postData = () => {
    if (
      P_Zipcode == '' ||
      P_City == '' ||
      AvailStartDateTime == '' ||
      AvailEndDateTime == ''
    ) {
      alert('Incomeplete Data');
      return;
    }
    try {
      fetch(
        'http://parkwayapi-env-2.eba-xgm5ffvk.us-east-2.elasticbeanstalk.com/search',
        {
          //fetch('http://10.0.0.153:5000/login', {
          method: 'POST',
          mode: 'cors',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            P_Zipcode: this.state.P_Zipcode,
            P_City: this.state.P_City,
            AvailStartDateTime: this.state.AvailStartDateTime,
            AvailEndDateTime: this.state.AvailEndDateTime,
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

          if (responseCode == 200) {
            this.props.navigation.navigate('booking', {data});
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
          <View style={styles.search_header}>
            <View style={styles.search_input_box}>
              <Icon name="ios-search" style={styles.search_icon} />
              <TextInput
                placeholder="Search by pincode or city"
                style={styles.input}
                onChangeText={text => {
                  this.setState({P_Zipcode: text});
                }}
              />

              <TextInput
                placeholder="Search by pincode or city"
                style={styles.input}
                onChangeText={text => {
                  this.setState({P_City: text});
                }}
              />

              <TouchableOpacity
                onPress={() => this.showPicker('checkin')}
                style={styles.search_date_time_button}>
                <Text>{this.state.AvailStartDateTime || 'Check-in'}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => this.showPicker('checkout')}
                style={styles.search_date_time_button}>
                <Text>{this.state.AvailEndDateTime || 'Check-out'}</Text>
              </TouchableOpacity>

              <DateTimePicker
                isVisible={this.state.isVisible}
                onConfirm={this.handlePicker}
                onCancel={this.hidePicker}
                mode={'datetime'}
                is24Hour={true}
              />

              <CustomButton
                title="Search Parking"
                functionOnClick={() => {
                  this.postData();

                  //this.props.navigation.navigate('tabScreen');
                }}
              />
            </View>
          </View>

          {/* checkIn and checkout input boxes */}
          {/*  <View style={styles.search_check_in_check_out_container}>
              <View style={styles.search_check_in_check_out_sub_container}>
                <TextInput placeholder="Check-In" style={styles.input} />
                <DateTimePicker
                  isVisible={this.state.isVisible}
                  onConfirm={this.handlePicker}
                  onCancel={this.hidePicker}
                />
              </View> */}

          {/* <View>
            

            <TouchableOpacity
              onPress={() => this.showPicker('checkin')}
              style={styles.search_date_time_button}>
              <Text>{this.state.AvailStartDateTime || 'Check-in'}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => this.showPicker('checkout')}
              style={styles.search_date_time_button}>
              <Text>{this.state.AvailEndDateTime || 'Check-out'}</Text>
            </TouchableOpacity>

            <DateTimePicker
              isVisible={this.state.isVisible}
              onConfirm={this.handlePicker}
              onCancel={this.hidePicker}
              mode={'datetime'}
              is24Hour={true}
            />
          </View>  */}

          {/* <Button
            title="Search Parking"
            onPress={() => this.props.navigation.navigate('booking')}
            //onPress={() => this.props.navigation.navigate('tabScreen')}
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

export default Search;
