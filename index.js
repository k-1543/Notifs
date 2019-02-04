import { AppRegistry, View, BackHandler, Platform, Alert } from 'react-native';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import PushNotification from 'react-native-push-notification';
import reducers from './src/reducers';
import { Header } from './src/components/common/index';
import LibraryList from './src/components/LibraryList';

class App extends Component {
  componentDidMount() {
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
  handleBackButton() {
    Alert.alert(
        'Exit App',
        'Exiting the application?', [{
            text: 'Cancel',
            onPress: () => console.log('Cancelled')
        }, {
            text: 'OK',
            onPress: () => BackHandler.exitApp()
        }], {
            cancelable: false
        }
     );
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
