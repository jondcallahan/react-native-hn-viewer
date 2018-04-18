import React from 'react';
import {ApolloProvider, Query} from 'react-apollo';
import {FlatList} from 'react-native';

import gql from 'graphql-tag';
import _uniqBy from 'lodash.uniqby';

import {LoadingSpinner, Error, Story} from './';
import {isRefetching, isFetchingMore, api} from '../utils';

export const StoryFeed = ({navigation}) => (
  <ApolloProvider client={api}>
    <Query
      query={gql`
        query($offset: Int) {
          hn {
            topStories(limit: 20, offset: $offset) {
              id
              title
              score
              descendants
              by {
                id
              }
              timeISO
              url
            }
          }
        }
      `}
      variables={{offset: 0}}
      notifyOnNetworkStatusChange
    >
      {({loading, error, data, refetch, networkStatus, fetchMore}) => {
        if (loading && !isRefetching(networkStatus) && !isFetchingMore(networkStatus))
          return <LoadingSpinner />;
        if (error) return <Error retry={refetch} error={JSON.stringify(error)} />;

        return (
          <FlatList
            style={{padding: 8}}
            data={data.hn.topStories}
            keyExtractor={item => item.id}
            renderItem={({item, index}) => <Story {...{item, index, navigation}} />}
            onRefresh={refetch}
            onEndReached={() => {
              // Don't fetchMore when a request is still in flight or things will get funky
              if (!isFetchingMore(networkStatus)) {
                fetchMore({
                  variables: {
                    offset: data.hn.topStories.length,
                  },
                  updateQuery: (prevResult, {fetchMoreResult}) => {
                    if (!fetchMoreResult) return prevResult;
                    return {
                      ...prevResult,
                      hn: {
                        ...prevResult.hn,
                        topStories: _uniqBy(
                          prevResult.hn.topStories.concat(fetchMoreResult.hn.topStories),
                          'id'
                        ),
                      },
                    };
                  },
                });
              }
            }}
            refreshing={isRefetching(networkStatus)}
          />
        );
      }}
    </Query>
  </ApolloProvider>
);
