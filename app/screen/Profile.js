import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {Icon} from 'react-native-elements';
import PropTypes from 'prop-types';
import call from 'react-native-phone-call';

class Profile extends Component {
  render() {
    const args = {
      number: '+14086462243', // String value with the number to call
      prompt: true, // Optional boolean property. Determines if the user should be prompt prior to the call
    };
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <ImageBackground
            style={styles.backgroundImage}
            source={require('../assets/car2.jpg')}>
            <View style={styles.headerContent}>
              <Image
                style={styles.avatar}
                source={require('../assets/user.png')}
              />
            </View>
          </ImageBackground>
        </View>

        <View style={styles.body}>
          <View style={styles.item}>
            <View style={styles.iconContent}>
              <Image
                style={styles.icon}
                source={require('../assets/details.png')}
              />
            </View>
            <View style={styles.infoContent}>
              <Text
                style={styles.info}
                onPress={() =>
                  this.props.navigation.navigate('personaldetails')
                }>
                Personal Details
              </Text>
            </View>
          </View>

          {/* <View style={styles.item}>
            <View style={styles.iconContent}>
              <Image
                style={styles.icon}
                source={require('../assets/wallet.png')}
              />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.info}>Wallet</Text>
            </View>
          </View> */}

          <View style={styles.item}>
            <View style={styles.iconContent}>
              <Image
                style={styles.icon}
                source={require('../assets/fav.png')}
              />
            </View>
            <View style={styles.infoContent}>
              <Text
                style={styles.info}
                onPress={() => this.props.navigation.navigate('activities')}>
                Guest Activities
              </Text>
            </View>
          </View>

          <View style={styles.item}>
            <View style={styles.iconContent}>
              <Image
                style={styles.icon}
                source={require('../assets/fav.png')}
              />
            </View>
            <View style={styles.infoContent}>
              <Text
                style={styles.info}
                onPress={() =>
                  this.props.navigation.navigate('hostactivities')
                }>
                Host Activities
              </Text>
            </View>
          </View>

          <View style={styles.item}>
            <View style={styles.iconContent}>
              <Image
                style={styles.icon}
                source={require('../assets/faq.png')}
              />
            </View>
            <View style={styles.infoContent}>
              <Text
                style={styles.info}
                onPress={() =>
                  this.props.navigation.navigate('howparkwayworks')
                }>
                How ParkWay Works
              </Text>
            </View>
          </View>

          <View style={styles.item}>
            <View style={styles.iconContent}>
              <Image
                style={styles.icon}
                source={require('../assets/support.png')}
              />
            </View>
            <View style={styles.infoContent}>
              <Text
                style={styles.info}
                onPress={() => {
                  call(args).catch(console.error);
                }}>
                Contact Support
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',

    //backgroundColor: "#8cc2c2",
  },
  headerContent: {
    padding: 10,
    //alignItems: 'center',
    flexDirection: 'column',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    //justifyContent: "center",
    //alignItems: "center",
    opacity: 0.7,
  },
  avatar: {
    width: 65,
    height: 65,
    borderRadius: 31.5,
    borderWidth: 2,
    //borderColor: "white",
    marginBottom: 5,
  },
  name: {
    fontSize: 22,
    color: 'black',
    fontWeight: '600',
  },
  userInfo: {
    fontSize: 16,
    color: 'black',
    fontWeight: '600',
  },
  body: {
    backgroundColor: '#8cc2c2',
    height: '90%',
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: 10,
  },
  item: {
    flexDirection: 'row',
  },
  infoContent: {
    flex: 1,
    alignItems: 'flex-start',
    paddingLeft: 5,
  },
  iconContent: {
    alignItems: 'flex-end',
    paddingRight: 5,
  },
  icon: {
    width: 30,
    height: 30,
    marginTop: 20,
  },
  info: {
    fontSize: 18,
    marginTop: 20,
    color: 'black',
  },
});

export default Profile;
