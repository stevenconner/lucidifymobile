import React from 'react';
import { Provider, connect } from 'react-redux';
import { StackNavigator, addNavigationHelpers } from 'react-navigation';
import { Routes } from './src/nav/Router';
import getStore from './src/state/Store';
import Expo from 'expo';
import { COLOR, ThemeProvider } from 'react-native-material-ui';
import * as STYLES from './src/styles';

import { BackHandler } from 'react-native';

const AppNavigator = StackNavigator(Routes, {
  initialRouteName: 'LoginScreen',
  headerMode: 'screen',
  mode: 'card',
  navigationOptions: {
    gesturesEnabled: false,
  }
})

const navReducer = (state, action) => {
  const newState = AppNavigator.router.getStateForAction(action, state);
  return newState || state;
}

// Caches UI images and loads them into Expo.Assets
function cacheImages(images) {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Expo.Asset.loadAsync(image);
    }
  });
}

function cacheFonts(fonts) {
  return fonts.map(font => Expo.Font.loadAsync(font));
}

@connect(state => ({
  nav: state.nav
}))
class AppWithNavigationState extends React.Component {
  state = {
    appIsReady: false,
  }

  handleBackPress = () => {
    const { dispatch, nav } = this.props;
    const navigation = addNavigationHelpers({
      dispatch,
      state: nav,
    })
    navigation.goBack();
    return true;
  }

  componentWillMount() {
    this._loadAssetsAsync();
  }

  componentDidMount() {
    BackHandler.addEventListener('backPress', this.handleBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('backPress', this.handleBackPress);
  }

  async _loadAssetsAsync() {
    const imageAssets = cacheImages([
      require('./assets/images/daytime.png'),
      require('./assets/images/nighttime.png'),
      require('./assets/images/day.png'),
      require('./assets/images/night.jpg'),
      require('./assets/images/splash3.jpg'),
    ])
    const fontAssets = cacheFonts([
      { 'Roboto': require('./assets/fonts/RobotoMono-Regular.ttf') },
      { 'Sedgwick': require('./assets/fonts/SedgwickAve-Regular.ttf') }
    ])
    await Promise.all([
      ...imageAssets,
      ...fontAssets,
    ])
    this.setState({
      appIsReady: true,
    })
  }
  
  render() {
    // If the app is not finished loading assets return the loading screen.
    if (!this.state.appIsReady) {
      return <Expo.AppLoading />
    }
    return (
      <AppNavigator
        navigation={addNavigationHelpers({
          dispatch: this.props.dispatch,
          state: this.props.nav
        })}
      />
    )
  }
}

const store = getStore(navReducer);

const uiTheme = {
  palette: {
      primaryColor: STYLES.SD_DARK_PURPLE,
  },
  toolbar: {
      container: {
          height: 50,
      },
  },
};

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <ThemeProvider uiTheme={uiTheme}>
          <AppWithNavigationState />
        </ThemeProvider>
      </Provider>
    )
  }
}

export default App;