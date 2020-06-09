import React from 'react';
import {Text, View, StyleSheet, ImageBackground, Button} from 'react-native';
import {connect} from 'react-redux';

class Personaldetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      responsedata: '',
      isLoading: false,
      firstName: '',
    };
  }
  // componentDidMount(){
  //   this.getapidata()
  // }
  // async getapidata(){
  //   let resp=await Axios.get('http://parkwayapi-env-2.eba-xgm5ffvk.us-east-2.elasticbeanstalk.com/profile_details/userID')
  // console.warn(resp.data)
  // }

  componentDidMount() {
    const loginId = this.props.account.loginId;

    console.log('LoginId:', loginId, this.props);
    fetch(
      `http://parkwayapi-env-2.eba-xgm5ffvk.us-east-2.elasticbeanstalk.com/profile_details/${loginId}`,
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

  renderCheck() {
    return this.state.responsedata.map(data => {
      return (
        <View>
          <Text> {data.Name}</Text>
        </View>
      );
    });
  }

  /* async componentDidMount() {
    // GET request using fetch with async/await
    fetch(
      'http://parkwayapi-env-2.eba-xgm5ffvk.us-east-2.elasticbeanstalk.com/profile_details/11',
    )
      .then(response => response.json())
      .then(Responsejson => {
        this.setState({
          data: Responsejson,
        });
      });
  } */

  render() {
    const {responsedata, isLoading} = this.state;

    if (!responsedata) {
      return <Text>Loading</Text>;
    }

    const results = JSON.parse(responsedata.result);

    console.log('Actual Response from api: ', results);

    /* var {responsedata = []} = this.state;
    var {isLoading} = this.state; */
    //console.log('Result of api: ', responsedata);

    //result = JSON.parse(responsedata.result);

    //console.log('this ', results[0]);

    //const results = JSON.parse([responsedata]);

    return (
      <ImageBackground
        source={require('../assets/plainBackground.jpg')}
        style={styles.backgroundImage}>
        <View style={styles.registrationDetails}>
          <Text style={styles.welcome2}> Your personal details</Text>
          <Text style={styles.welcome}>Name:{results[0].Name} </Text>
          <Text style={styles.welcome}>Email ID:{results[0].EmailID} </Text>
          <Text style={styles.welcome}>Username:{results[0].Username} </Text>
          <Text style={styles.welcome}>
            Contact Number {results[0].Contact_Number}{' '}
          </Text>
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
  item: {
    marginTop: 10,
    padding: 10,
    backgroundColor: 'rgba(255,255,255,.7)',
    fontSize: 24,
    flexDirection: 'column',
  },
  welcome2: {
    fontSize: 30,
    marginTop: 10,
    padding: 10,
    flexDirection: 'column',
    textAlign: 'center',
    margin: 10,
    color: 'rgba(69,145,130,10)',
  },
  welcome: {
    fontSize: 24,
    marginTop: 10,
    padding: 10,
    flexDirection: 'column',
    textAlign: 'center',
    margin: 10,
    color: 'rgba(69,145,130,10)',
  },
  registrationDetails: {
    width: '90%',
    height: '100%',
    backgroundColor: 'rgba(255,255,255,.7)',
    alignSelf: 'center',
    justifyContent: 'center',
    padding: 20,
  },
});
const mapStateToProps = state => ({
  account: state.account,
});
export default connect(
  mapStateToProps,
  null,
)(Personaldetails);
