/* eslint react/display-name: 0 */
import React from 'react';
import {ApolloProvider, Query} from 'react-apollo';
import {FlatList} from 'react-native';

import gql from 'graphql-tag';

import {LoadingSpinner, Error, Comment, Story} from './';
import {isRefetching, api} from '../utils';

export const CommentFeed = ({navigation}) => (
  <ApolloProvider client={api}>
    <Query
      query={gql`
        {
          hn {
            item(id: ${navigation.getParam('id')}) {
              title
              by {
                id
              }
              text
              url
              timeISO
              type
              kids {
                id
                text
                by {
                  id
                }
                timeISO
                kids {
                  id
                }
              }
            }
          }
        }
      `}
      notifyOnNetworkStatusChange
    >
      {({loading, error, data, refetch, networkStatus}) => {
        if (loading && !isRefetching(networkStatus)) return <LoadingSpinner />;
        if (error) return <Error retry={refetch} error={JSON.stringify(error)} />;
        const {title, by, text, url, timeISO, type} = data.hn.item;
        return (
          <FlatList
            style={{padding: 8}}
            ListHeaderComponent={
              type === 'comment'
                ? undefined
                : () => (
                    <Story
                      item={{
                        ...{
                          timeISO,
                          by,
                          title,
                          text,
                          url,
                        },
                      }}
                      hideNumberBall
                    />
                  )
            }
            data={data.hn.item.kids}
            keyExtractor={item => item.id}
            renderItem={({item, index}) => <Comment {...{item, index, navigation}} />}
            onRefresh={refetch}
            refreshing={isRefetching(networkStatus)}
          />
        );
      }}
    </Query>
  </ApolloProvider>
);
