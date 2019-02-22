import { AppRegistry, View, BackHandler, Platform, PermissionsAndroid, Alert } from 'react-native';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import PushNotification from 'react-native-push-notification';
import reducers from './src/reducers';
import { Header } from './src/components/common/index';
import LibraryList from './src/components/LibraryList';

class App extends Component {
  componentDidMount() {
    this.requestPermissions = this.requestPermissions.bind(this);
    if (Platform.OS === 'android') {
      this.setState({ count: 0 }, () => this.requestPermissions());
      BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }
    PushNotification.configure({
      onRegister(token) {
        console.log('TOKEN:', token);
      },
      onNotification(notification) {
      console.log('NOTIFICATION:', notification);
      //notification.finish(PushNotificationIOS.FetchResult.NoData);
    },
    senderID: 'YOUR GCM (OR FCM) SENDER ID',
    popInitialNotification: true,
    requestPermissions: true,
    });
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }
  async requestPermissions() {
    try {
        await PermissionsAndroid.requestMultiple(
        [PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE])
        .then(results => {
          Object.entries(results).map(([key, value]) => {
                 console.log(key, value);
                 if (value === 'denied' && this.state.count === 0) {
                   this.setState({ count: this.state.count + 1 },
                   () => {
                     Alert.alert('Error', 'We need these permissions for the app to work correctly',
                      [
                        { text: 'Deny Anyway',
                          onPress: () => BackHandler.exitApp(),
                          style: 'cancel' },
                        { text: 'Okay, I\'ll Allow',
                          onPress: () => {
                                          this.setState({ count: 0 },
                                          () => { this.requestPermissions(); });
                                          }
                        }
                      ],
                      { cancelable: false });
                   });
                 }
                 return true;
             });
        });
    } catch (err) {
      console.log(err);
    }
  }
  handleBackButton() {
     return true;
   }
  render() {
    return (
      <Provider store={createStore(reducers)}>
        <View style={{ flex: 1 }}>
          <Header>Bigger Leagues Now</Header>
          <LibraryList />
        </View>
      </Provider>
    );
  }
}

AppRegistry.registerComponent('ReduxReal', () => App);
