import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Title3, Caption1} from 'react-native-ios-kit';
import {WebBrowser} from 'expo';
import urlParse from 'url-parse';

import {AuthorInfo, CaptionRow, Separator} from './index';

import {getRelDate} from '../utils';

export const Story = ({item, index, navigation}) => {
  const dateString = getRelDate(item.timeISO);
  const urlString = item.url ? urlParse(item.url).hostname : null;
  return (
    <View style={{marginTop: 8}}>
      <AuthorInfo author={item.by && item.by.id} number={index + 1} />
      <View style={{marginLeft: 28}}>
        {/* Move content over 20 for avatar + 8 for avatar margin = 28 */}
        <TouchableOpacity
          onPress={async () => {
            await WebBrowser.openBrowserAsync(item.url);
          }}
        >
          <Title3 style={{marginVertical: 2, paddingRight: 24}}>{item.title}</Title3>
        </TouchableOpacity>
        {urlString && <Caption1 style={{marginBottom: 2, marginTop: 8}}>{urlString}</Caption1>}

        <CaptionRow
          relDate={dateString}
          upvotes={item.score}
          numComments={item.descendants}
          id={item.id}
          navigation={navigation}
        />
      </View>
      <Separator />
    </View>
  );
};
