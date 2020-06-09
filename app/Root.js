import React from 'react';

import {
  createBottomTabNavigator,
  createStackNavigator,
  View,
  Text,
  createAppContainer,
} from 'react-navigation';

import Icon from 'react-native-vector-icons/Ionicons';

import HostDetails from './screen/HostDetails';
import HostMain from './screen/HostMain';
import SpotDetails from './screen/SpotDetails';
import Profile from './screen/Profile';
import Registration from './screen/Registration';
import NewLogin from './screen/NewLogin';
import Search from './screen/Search';
import Booking from './screen/Booking';
import Welcome from './screen/WelcomePage';
import PrePaymentPage from './screen/PrePaymentPage';
import Payment from './screen/Payment';
import Activities from './screen/Activities';
import ActivityDetails from './screen/ActivityDetails';
import Personaldetails from './screen/Personaldetails';
import SubSpotDetails from './screen/SubSpotDetails';
import HostActivities from './screen/HostActivities';
import HActivityDetails from './screen/HActivityDetails';
import HowParkWayWorks from './screen/HowParkWayWorks';
import HostHome from './screen/HostHome';
import HostSpotAval from './screen/HostSpotAval';
import EnterAvailability from './screen/EnterAvailability';
import ViewAvailability from './screen/ViewAvailability';

/* const bottomTab2 = createMaterialBottomTabNavigator(
  {
    search: {screen: Search},
    host: {screen: Welcome},
    profile: {screen: Registration},
  },
  {
    initialRouteName: 'search',
    activeColor: '#f0edf6',
    inactiveColor: '#3e2465',
    barStyle: {backgroundColor: '#694fad'},
  },
); */

const TabNavigator = createBottomTabNavigator(
  {
    search: {
      screen: Search,
      navigationOptions: {
        tabBarLabel: 'Search',
        tabBarIcon: ({tintColor}) => (
          <Icon style={[{color: tintColor}]} size={25} name={'ios-search'} />
        ),
      },
    },
    profile: {
      screen: Profile,
      navigationOptions: {
        tabBarLabel: 'Profile',
        tabBarIcon: ({tintColor}) => (
          <Icon style={[{color: tintColor}]} size={25} name={'ios-person'} />
        ),
        activeColor: '#f60c0d',
        inactiveColor: '#f65a22',
        barStyle: {backgroundColor: '#f69b31'},
      },
    },

    host: {
      screen: HostMain,
      navigationOptions: {
        tabBarLabel: 'Host',
        tabBarIcon: ({tintColor}) => (
          <Icon style={[{color: tintColor}]} size={25} name={'ios-person'} />
        ),
      },
    },
  },
  {
    initialRouteName: 'search',
    activeColor: '#f0edf6',
    inactiveColor: '#226557',
    barStyle: {backgroundColor: '#3BAD87'},
  },
);

//export default createAppContainer(TabNavigator);

const stack = createStackNavigator(
  {
    welcome: {screen: Welcome},
    registration: {screen: Registration},
    login: {screen: NewLogin},
    search: {screen: Search},
    booking: {screen: Booking},
    prepayment: {screen: PrePaymentPage},
    payment: {screen: Payment},
    spotDetails: {screen: SpotDetails},
    hostDetails: {screen: HostDetails},
    tabScreen: {screen: TabNavigator},
    activities: {screen: Activities},
    activitydetails: {screen: ActivityDetails},
    personaldetails: {screen: Personaldetails},
    subspotdetails: {screen: SubSpotDetails},
    hostactivities: {screen: HostActivities},
    hactivitydetails: {screen: HActivityDetails},
    howparkwayworks: {screen: HowParkWayWorks},
    hosthome: {screen: HostHome},
    hostspotaval: {screen: HostSpotAval},
    enteravailability: {screen: EnterAvailability},
    viewavailability: {screen: ViewAvailability},
  },
  {
    initialRouteName: 'welcome',
  },
);
export default stack;
//export default stack;
