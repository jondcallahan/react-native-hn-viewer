import * as React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Caption1} from 'react-native-ios-kit';

export const CaptionRow = ({relDate, upvotes, numComments, id, navigation}) => {
  return (
    <View style={{display: 'flex', flexDirection: 'row', marginVertical: 2}}>
      <Caption1>{relDate}</Caption1>
      {(Number.isInteger(upvotes) && <Caption1 style={{flex: 1, marginLeft: 8}}>⬆️ {upvotes}</Caption1>) || (
        // render an empty component to maintain layout 🙄
        <View style={{flex: 1}} />
      )}
      {numComments && (
        <TouchableOpacity
          style={{marginRight: 28}}
          hitSlop={{top: 20, right: 20, bottom: 20, left: 20}}
          onPress={() => {
            navigation.navigate('Child', {id});
          }}
        >
          <Caption1>💬 {numComments}</Caption1>
        </TouchableOpacity>
      )}
    </View>
  );
};
