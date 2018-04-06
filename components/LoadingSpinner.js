import React from 'react';
import {View} from 'react-native';
import {Spinner} from 'react-native-ios-kit';

export const LoadingSpinner = () => (
  <View style={{flex: 1, justifyContent: 'center'}}>
    <Spinner theme={{primaryColor: '#666666'}} size="large" />;
  </View>
);
