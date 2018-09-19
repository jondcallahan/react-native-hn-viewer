import React, {Component} from 'react';
import {View} from 'react-native';
import {Spinner} from 'react-native-ios-kit';
import {Haptic} from 'expo';

export class LoadingSpinner extends Component {
  componentWillUnmount() {
    Haptic.impact(Haptic.ImpactStyles.Light);
  }
  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <Spinner theme={{primaryColor: '#666666'}} size="large" />;
      </View>
    );
  }
}
