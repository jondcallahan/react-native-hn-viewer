import * as React from 'react';
import {View, Text} from 'react-native';

export const NumberBall = ({number, size = 20}) => (
  <View
    style={{
      height: size,
      width: size,
      borderRadius: size / 2,
      justifyContent: 'center',
      backgroundColor: 'transparent',
      borderColor: 'black',
      borderWidth: 1,
    }}
  >
    <Text
      style={{
        fontSize: size / 2,
        textAlign: 'center',
        backgroundColor: 'transparent',
        color: 'black',
      }}
    >
      {number}
    </Text>
  </View>
);
