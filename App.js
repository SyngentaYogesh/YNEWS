import React, {Component, Fragment} from 'react';
import {Platform, View} from 'react-native';
import {Provider} from 'react-redux';
import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import {Provider as PaperProvider, DefaultTheme} from 'react-native-paper';
import AppContainer from './src/navigator';
import rootReducer from './src/reducers';
import {setScreenHeight} from './src/helpers/DimensionsHelper';
import {YNEWS_BRAND} from './src/constants/Colors';
console.disableYellowBox = true;
const store = createStore(rootReducer, applyMiddleware(thunk));

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: YNEWS_BRAND,
    accent: 'white',
    text: 'black',
  },
};

class App extends Component {
  state = {
    isLoaded: false,
  };

  render() {
    const {isLoaded} = this.state;
    if (isLoaded) {
      return (
        <Provider store={store}>
          <PaperProvider theme={theme}>
            <AppContainer />
          </PaperProvider>
        </Provider>
      );
    } else {
      return (
        <View
          style={{flex: 1}}
          onLayout={event => {
            var {x, y, width, height} = event.nativeEvent.layout;
            setScreenHeight(height);
            this.setState({isLoaded: true});
          }}
        />
      );
    }
  }
}
export default App;
