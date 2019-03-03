import React, { Component } from 'react';
import {
  //Platform,
  //UIManager,
  Text,
  TouchableWithoutFeedback,
  View,
  LayoutAnimation } from 'react-native';
import { connect } from 'react-redux';
import PushNotification from 'react-native-push-notification';
import { CardItem, Card } from './common';
import * as actions from '../actions';

class ListItem extends Component {
  componentWillUpdate() {
    // if (Platform.OS === 'android') {
    //   UIManager.setLayoutAnimationEnabledExperimental
    //   &&
    //   UIManager.setLayoutAnimationEnabledExperimental(true);
    // }
    LayoutAnimation.spring();
  }
  showDesc() {
    const { library, expanded } = this.props;
    if (expanded) {
      return (
        <Card>
          <Text style={{ flex: 1 }}>{library.description}</Text>
        </Card>
      );
    }
  }
  render() {
    const { id, title } = this.props.library;
    return (
      <TouchableWithoutFeedback
        onPress={() => {
            this.props.selectLibrary(id);
            PushNotification.localNotification({
              /* Android Only Properties */
              id: '0',
              /* iOS and Android properties */
              title: `You have selected ${title}`, // (optional)
              message: `${this.props.library.description}`, // (required)
              playSound: false, // (optional) default: true
              actions: '["Yes", "No"]', //(Android only)
            });
          }
        }
      >
        <View>
          <CardItem>
            <Text style={styles.titleStyle}>{title}</Text>
          </CardItem>
          {this.showDesc()}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
const styles = {
  titleStyle:
  {
    fontSize: 28,
    paddingLeft: 15
  }
};
const mapStatetoProps = (state, ownProps) => {
  const expanded = state.selectedLibraryId === ownProps.library.id;
  return { expanded };
};
export default connect(mapStatetoProps, actions)(ListItem);
