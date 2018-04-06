import * as React from 'react';
import {View, SafeAreaView, FlatList, Alert} from 'react-native';
import {ThemeProvider} from 'react-native-ios-kit';

import ApolloClient from 'apollo-boost';
import {Query, ApolloProvider} from 'react-apollo';
import gql from 'graphql-tag';
import deepMerge from 'deepmerge';

import {StackNavigator} from 'react-navigation';

import {isRefetching} from './utils';

import {Comment, LoadingSpinner, Story} from './components';

const client = new ApolloClient({
  uri: 'https://graphqlhub.com/graphql',
});

const Error = ({retry, error}) => {
  Alert.alert('🤷‍♂️', error, [{text: 'Retry', onPress: retry}]);
  return null;
};

const CommentFeed = ({navigation}) => (
  <ApolloProvider client={client}>
    <Query
      query={gql`
        {
          hn {
            item(id: ${navigation.getParam('id')}) {
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
        return (
          <FlatList
            style={{padding: 8}}
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
const StoryFeed = ({navigation}) => (
  <ApolloProvider client={client}>
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
        if (loading && !isRefetching(networkStatus) && networkStatus !== 3) return <LoadingSpinner />;
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
              if (networkStatus !== 3) {
                fetchMore({
                  variables: {
                    offset: data.hn.topStories.length,
                  },
                  updateQuery: (prevResult, {fetchMoreResult}) => {
                    if (!fetchMoreResult) return prevResult;
                    return deepMerge(prevResult, fetchMoreResult);
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

const RootStack = StackNavigator(
  {
    Home: {
      screen: StoryFeed,
      path: '/',
    },
    Child: {
      screen: CommentFeed,
      path: '/child/:id',
    },
  },
  {
    headerMode: 'none',
    cardStyle: {
      backgroundColor: 'papayawhip',
      shadowRadius: 0,
      shadowOpacity: 0,
    },
  }
);

class App extends React.Component {
  render() {
    return (
      <SafeAreaView style={{backgroundColor: 'papayawhip', flex: 1}}>
        <ThemeProvider>
          <View style={{flex: 1}}>
            <RootStack />
          </View>
        </ThemeProvider>
      </SafeAreaView>
    );
  }
}

export default App;
