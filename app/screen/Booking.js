import React, {Component} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import CustomButton from '../components/Button';
import {createAppContainer, createStackNavigator} from 'react-navigation';
import {Button} from 'react-native-paper';

export default class Booking extends Component {
  constructor(props) {
    super(props);
    //here I am getting response data of search api in params
    //const {params} = this.props.navigation.state;
    const params = this.props.navigation.state.params;

    this.state = {
      responsedata: params.data,
      isLoading: false,
      spotName: '',
      ParkingFeePerHour: '',
      SPotAddress: '',
      tfee: '',
      sdid: '',
      rsdatetime: '',
      redatetime: '',
    };
  }

  /* componentDidMount() {
    fetch('https://5e991ed75eabe7001681c770.mockapi.io/spotSearch')
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
  } */

  /* window.onload = function() {
    $.getJSON( "main.json", function(json) {
        // process the results here
    });
} */

  /* componentDidMount() {
    const {responsedata, isLoading} = this.state;
    const results = JSON.parse(responsedata.results);
  } */

  postData = () => {
    /*  if (
      this.state.spotName == '' ||
      this.state.ParkingFeePerHour == '' ||
      this.state.SPotAddress == ''
    ) {
      alert('Data is not set');
      return;
    } */
    /* this.setState({spotName: item.spotName});
    this.setState({ParkingFeePerHour: item.ParkingFeePerHour});
    this.setState({SPotAddress: item.SPotAddress}); */

    console.log('Booking SPotAddress', this.state.SPotAddress);
    console.log('Booking ParkingFeePerHour', this.state.ParkingFeePerHour);
    console.log('Booking spotName', this.state.spotName);
    console.log('Booking sdid', this.state.sdid);
    console.log('Booking rsdatetime', this.state.rsdatetime);
    console.log('Booking redatetime', this.state.redatetime);

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
            spotName: this.state.spotName,
            ParkingFeePerHour: this.state.ParkingFeePerHour,
            SPotAddress: this.state.SPotAddress,
            tfee: this.state.tfee,
            sdid: this.state.sdid,
            rsdatetime: this.state.responsedata.AvailStartDateTime,
            redatetime: this.state.responsedata.AvailEndDateTime,
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
            this.props.navigation.navigate('prepayment', {data});
          }
        });
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    const {responsedata, isLoading} = this.state;
    console.log('Data from search: ', responsedata);
    const results = JSON.parse(responsedata.result || null);

    return (
      <View style={[styles.registrationDetails, {flexDirection: 'column'}]}>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            data={results}
            keyExtractor={({id}, index) => id}
            renderItem={({item}) => (
              <View style={styles.item}>
                <Text style={styles.item}>Spot Name:{item.spotName} </Text>

                <Text style={styles.item}>
                  Spot Price: ${item.ParkingFeePerHour}{' '}
                </Text>
                <Text style={styles.item}>Address:{item.SPotAddress} </Text>
                <Text style={styles.item}>
                  Total fee including taxes:{item.total_fee}{' '}
                </Text>

                {/* <Button
                    onPress={() => {
                      this.setState({spotName: item.spotName});
                      this.setState({
                        ParkingFeePerHour: item.ParkingFeePerHour,
                      });
                      this.setState({SPotAddress: item.SPotAddress});
                      this.postData();
                    }}
                    title="Book Now"
                  /> */}
                <CustomButton
                  title="Book Now"
                  functionOnClick={() => {
                    this.setState(
                      {
                        spotName: item.spotName,
                        ParkingFeePerHour: item.ParkingFeePerHour,
                        SPotAddress: item.SPotAddress,
                        tfee: item.total_fee,
                        sdid: item.SdID,
                      },
                      () => {
                        this.postData({item});
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
            )}
          />
        )}
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
    marginTop: 10,
    padding: 10,
    flex: 1,
    backgroundColor: 'rgba(255,255,255,.7)',
    fontSize: 24,
    flexDirection: 'column',
  },

  registrationDetails: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255,255,255,.7)',
    //backgroundColor: 'rgba(255,255,255,.7)',
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
});
