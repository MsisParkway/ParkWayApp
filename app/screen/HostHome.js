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
import {connect} from 'react-redux';

class HostHome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      isLoading: true,
    };
  }

  componentDidMount() {
    const loginId = this.props.account.loginId;

    fetch(
      `http://parkwayapi-env-2.eba-xgm5ffvk.us-east-2.elasticbeanstalk.com/host_home/${loginId}`,
    )
      .then(response => response.json())
      .then(Responsejson => {
        this.setState({
          responsedata: Responsejson,
        });
      })
      .catch(error => console.error(error))
      .finally(() => {
        this.setState({isLoading: false});
      });
  }

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
            this.props.navigation.navigate('hostspotaval', {data});
          }
        });
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    const {responsedata, isLoading} = this.state;

    if (!responsedata) {
      return <Text>Loading</Text>;
    }

    const results = JSON.parse(responsedata.result);

    return (
      <View>
        <Text style={styles.appText}>My Spaces</Text>

        <View style={[styles.registrationDetails, {flexDirection: 'column'}]}>
          {isLoading ? (
            <ActivityIndicator />
          ) : (
            <FlatList
              data={results}
              keyExtractor={({id}, index) => id}
              renderItem={({item}) => (
                <View style={styles.item}>
                  <Text style={styles.item}>Spot Name: {item.SpotName}</Text>
                  <CustomButton
                    title="View Details"
                    functionOnClick={() => {
                      this.setState(
                        {
                          SdID: item.SdID,
                          SpotName: item.SpotName,
                          SpotAddress: item.SpotAddress,
                          P_City: item.P_City,
                          parkingfeeperhour: item.parkingfeeperhour,
                        },
                        () => {
                          this.postData({item});
                        },
                      );
                      //this.props.navigation.navigate('hostspotaval');
                      //this.props.navigation.navigate('tabScreen');
                    }}
                  />
                </View>
              )}
            />
          )}
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
const mapStateToProps = state => ({
  account: state.account,
});
export default connect(
  mapStateToProps,
  null,
)(HostHome);
