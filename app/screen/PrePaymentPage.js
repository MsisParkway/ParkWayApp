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
import {connect} from 'react-redux';
import {createAppContainer, createStackNavigator} from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';
import CustomButton from '../components/Button';
//import CustomTextInput from '../components/TextInput';

class PrePaymentPage extends React.Component {
  constructor(props) {
    super(props);
    const params = this.props.navigation.state.params;

    this.state = {
      responsedata: params.data,
      isLoading: true,
      gid: '',
      sdid: '',
      rsdatetime: '',
      redatetime: '',
      tfee: '',
    };
  }

  postData = () => {
    //GID will be handled using redux
    console.log('prepayment gid', this.props.account.loginId);
    console.log('prepayment sdid', this.state.sdid);
    console.log('prepayment rsdatetime', this.state.rsdatetime);
    console.log('prepayment redatetime', this.state.redatetime);
    console.log('prepayment tfee', this.state.tfee);

    try {
      console.log('Calling api');
      fetch(
        'http://parkwayapi-env-2.eba-xgm5ffvk.us-east-2.elasticbeanstalk.com/reservation',
        {
          //fetch('http://10.0.0.153:5000/login', {
          method: 'POST',
          mode: 'cors',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            gid: this.props.account.loginId,
            sdid: this.state.sdid,
            rsdatetime: this.state.rsdatetime,
            redatetime: this.state.redatetime,
            tfee: this.state.tfee,
          }),
        },
      ).then(response => {
        const statusCode = response.status;
        //const promiseofdata = response.json();
        // return Promise.all([statusCode, promiseofdata]);
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

        if (statusCode == 200) {
          this.props.navigation.navigate('payment');
        }
      });
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    const {responsedata, data, isLoading} = this.state;

    console.log('********Prepayment*********** ', responsedata);

    if (!responsedata) {
      return <Text>Loading</Text>;
    }

    //const results = JSON.parse(responsedata.result);

    return (
      <View style={styles.registrationDetails}>
        <Text style={styles.item}>Spot Name:{responsedata.spotName} </Text>
        <Text style={styles.item}>
          Parking Fee Per Hour:{responsedata.ParkingFeePerHour}{' '}
        </Text>
        <Text style={styles.item}>
          Spot Address:{responsedata.SPotAddress}{' '}
        </Text>

        <Text style={styles.item}>
          Total Fee including taxes:{responsedata.tfee}{' '}
        </Text>
        {/*   <CustomButton
          title="Reserve Now"
          functionOnClick={() => {
            this.props.navigation.navigate('payment');
          }}
        /> */}

        <CustomButton
          title="Reserve Now"
          functionOnClick={() => {
            this.setState(
              {
                sdid: responsedata.sdid,
                rsdatetime: responsedata.rsdatetime,
                redatetime: responsedata.redatetime,
                tfee: responsedata.tfee,
              },
              () => {
                this.postData();
              },
            );
            /* this.setState({
                        ParkingFeePerHour: item.ParkingFeePerHour,
                      });
                      this.setState({SPotAddress: item.SPotAddress});
                      this.postData({item}); */
          }}
        />
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
  item: {
    marginTop: 5,
    padding: 5,
    flex: 1,
    backgroundColor: 'rgba(255,255,255,.7)',
    fontSize: 24,
    flexDirection: 'column',
  },

  registrationDetails: {
    width: '100%',
    height: '100%',
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
    padding: 10,
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
)(PrePaymentPage);
