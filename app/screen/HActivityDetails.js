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

class HActivityDetails extends React.Component {
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

  render() {
    const {responsedata, data, isLoading} = this.state;
    const args = {
      number: '+14086462243', // String value with the number to call
      prompt: true, // Optional boolean property. Determines if the user should be prompt prior to the call
    };

    if (!responsedata) {
      return <Text>Loading</Text>;
    }

    return (
      <View style={[styles.registrationDetails, {flexDirection: 'column'}]}>
        <View style={styles.item}>
          <Text style={styles.appText}>Hosted Spot Reservation Details </Text>
          <Text style={styles.item}>Spot Name: {responsedata.SpotName} </Text>
          <Text style={styles.item}>
            Start Date and Time: {responsedata.reserved_from}{' '}
          </Text>
          <Text style={styles.item}>
            End Date and Time: {responsedata.reserved_to}
          </Text>
          <Text style={styles.item}>
            Total Price: ${responsedata.totalfee}{' '}
          </Text>
          <Text style={styles.item}>Address:{responsedata.SpotAddress} </Text>
          <Text style={styles.item}>City:{responsedata.P_City} </Text>
          <CustomButton
            title="Contact Support"
            functionOnClick={() => {
              call(args).catch(console.error);
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
  buttonContainer: {
    backgroundColor: '#8cc2c2',
    paddingVertical: 10,
  },

  buttonText: {
    textAlign: 'center',
    color: '#FFF',
  },
});

export default HActivityDetails;
