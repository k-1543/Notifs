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
    this.requestPermissions();
    if (Platform.OS === 'android') {
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
          Object.entries(results).map(([key, values]) => {
                 key.forEach((value) => {
                   console.log(values, value);
                   if (value !== 'granted') {
                     Alert.alert('Error', `We need for permission ${key}`);
                   }
                 });
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
