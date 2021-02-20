import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import HomeScreen from './screens/HomeScreen';
import WebScreen from './screens/WebScreen';

const StackNavigator = createStackNavigator(
  {
    Home: HomeScreen,
  },
  {
    defaultNavigationOptions: {
      title: 'YNEWS',
      header: null,
    },
    initialRouteName: 'Home',
  },
);

const AppContainer = createAppContainer(StackNavigator);

export default AppContainer;
