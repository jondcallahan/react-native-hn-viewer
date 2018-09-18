import * as React from 'react';
import {View, Text} from 'react-native';
import {withTheme} from 'react-native-ios-kit';

export const NumberBall = withTheme(({number, size = 20, theme}) => (
  <View
    style={{
      height: size,
      width: size,
      borderRadius: size / 2,
      justifyContent: 'center',
      backgroundColor: 'transparent',
      borderColor: theme.textColor,
      borderWidth: 1,
    }}
  >
    <Text
      style={{
        fontSize: size / 2,
        textAlign: 'center',
        backgroundColor: 'transparent',
        color: theme.textColor,
      }}
    >
      {number}
    </Text>
  </View>
));
