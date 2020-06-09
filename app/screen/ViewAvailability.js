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

export default class Activities extends Component {
  constructor(props) {
    super(props);
    const params = this.props.navigation.state.params;

    this.state = {
      responsedata: params.data,
      isLoading: false,
    };
  }

  c; /*omponentDidMount() {
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
  }*/

  render() {
    const {responsedata, isLoading} = this.state;

    if (!responsedata) {
      return <Text>Loading</Text>;
    }
    const results = JSON.parse(responsedata.result);

    return (
      <View>
        <Text style={styles.appText}>Spots Availability Schedule</Text>
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
                  <Text style={styles.item}>
                    Start Date Time: {item.AvailableStartDateTime}
                  </Text>
                  <Text style={styles.item}>
                    End Date Time: {item.AvailableEndDateTime}
                  </Text>
                  <View style={styles.container}>
                    <View>
                      <CustomButton
                        title="Edit Availability"
                        functionOnClick={() => {
                          this.props.navigation.navigate('enteravailability');
                          //this.props.navigation.navigate('tabScreen');
                        }}
                      />
                    </View>
                    <View>
                      <CustomButton
                        title="Delete Availability"
                        functionOnClick={() => {
                          this.props.navigation.navigate('viewavailability');
                          //this.props.navigation.navigate('tabScreen');
                        }}
                      />
                    </View>
                  </View>
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
});
