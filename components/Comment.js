import * as React from 'react';
import {View} from 'react-native';
import {Body} from 'react-native-ios-kit';
import {WebBrowser} from 'expo';
import HTMLView from 'react-native-htmlview';
import urlParse from 'url-parse';
import {getRelDate} from '../utils';

import {Separator} from './Separator';
import {CaptionRow} from './CaptionRow';
import {AuthorInfo} from './AuthorInfo';

export const Comment = ({item, index, navigation}) => (
  <View>
    <AuthorInfo author={item.by && item.by.id} number={String(index + 1)} />
    <View style={{marginLeft: 28}}>
      <HTMLView
        value={item.text || '<i>Deleted</i>'}
        style={{paddingRight: 28}}
        TextComponent={Body}
        textComponentProps={{
          style: {
            fontFamily: 'Georgia',
            lineHeight: 26,
          },
        }}
        onLinkPress={async url => {
          const {hostname, pathname, query} = urlParse(url);
          if (hostname === 'news.ycombinator.com' && pathname === '/item' && query.includes('id')) {
            return navigation.navigate('Child', {id: `${query.substring(4)}`});
          } else {
            await WebBrowser.openBrowserAsync(url);
          }
        }}
      />
      <View style={{marginVertical: 8}}>
        <CaptionRow
          numComments={item.kids.length}
          relDate={getRelDate(item.timeISO)}
          id={item.id}
          navigation={navigation}
        />
      </View>
    </View>
    <Separator />
  </View>
);
