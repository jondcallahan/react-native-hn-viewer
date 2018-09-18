import * as React from 'react';
import {View} from 'react-native';
import {withTheme} from 'react-native-ios-kit';

export const Separator = withTheme(({theme}) => (
  <View style={{height: 1, backgroundColor: theme.dividerColor, marginVertical: 8}} />
));
