import * as React from 'react';
import {View, SafeAreaView, StatusBar} from 'react-native';
import {ThemeProvider, DefaultTheme} from 'react-native-ios-kit';
import {StackNavigator} from 'react-navigation';
import {Brightness} from 'expo';

import {StoryFeed, CommentFeed} from './components';
console.disableYellowBox = true;

const darkTheme = {
  ...DefaultTheme,
  backgroundColor: '#222222',
  textColor: '#efefef',
  dividerColor: 'rgba(229,229,229,0.2)',
  style: 'dark',
};
const lightTheme = {
  ...DefaultTheme,
  backgroundColor: 'papayawhip',
  dividerColor: 'rgba(0,0,0,0.2)',
  style: 'light',
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: darkTheme,
    };
    this.setTheme();
  }
  async setTheme() {
    this.setState({
      theme: (await Brightness.getBrightnessAsync()) < 0.6 ? darkTheme : lightTheme,
    });
  }
  render() {
    const {
      theme,
      theme: {backgroundColor, style},
    } = this.state;
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
          backgroundColor,
          shadowRadius: 0,
          shadowOpacity: 0,
        },
      }
    );
    let barStyle = null;
    if (style === 'dark') {
      barStyle = 'light-content';
    }
    return (
      <SafeAreaView style={{backgroundColor, flex: 1}}>
        <StatusBar barStyle={barStyle} />
        <ThemeProvider theme={theme}>
          <View style={{flex: 1}}>
            <RootStack />
          </View>
        </ThemeProvider>
      </SafeAreaView>
    );
  }
}

export default App;
