import * as React from 'react';
import {View, SafeAreaView} from 'react-native';
import {ThemeProvider} from 'react-native-ios-kit';
import {StackNavigator} from 'react-navigation';

import {StoryFeed, CommentFeed} from './components';
console.disableYellowBox = true;
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
