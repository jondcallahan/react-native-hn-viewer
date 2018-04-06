import * as React from 'react';
import {View} from 'react-native';
import {NumberBall} from './NumberBall';
import {Footnote} from 'react-native-ios-kit';

export const AuthorInfo = ({author, number}) => (
  <View style={{display: 'flex', flexDirection: 'row', marginVertical: 4, alignContent: 'center'}}>
    <NumberBall number={String(number)} />{' '}
    <Footnote style={{marginLeft: 8}}>{(author !== 'undefined' && author) || 'Unknown'}</Footnote>
  </View>
);
