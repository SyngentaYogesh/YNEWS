import React, {Component} from 'react';
import {View, StyleSheet, StatusBar, Platform, Text} from 'react-native';
import ViewPager from '@react-native-community/viewpager';
import {connect} from 'react-redux';
import MenuNavigationScreen from './MenuNavigationScreen';
import NewsStackScreen from './NewsStackScreen';
import WebScreen from './WebScreen';
import Carousel from 'react-native-snap-carousel';
import {getScreenWidth, getScreenHeight} from '../helpers/DimensionsHelper';
import {BLACK} from '../constants/Colors';
import {
  setWebViewVisiblity,
  fetchCategoryNews,
  fetchAllYnews,
} from '../reducers/news';
import {bindActionCreators} from 'redux';
import ShortsLoader from '../components/ShortsLoader';
const screens = ['menu-navigation', 'news-stack', 'web'];

class HomeScreen extends Component {
  constructor(props) {
    super(props);
  }
  shouldComponentUpdate = nextProps => {
    const currentProps = this.props;
    return true;
    // if (currentProps.isNewsListEmpty !== nextProps.isNewsListEmpty) {
    //   return true;
    // } else {
    //   return false;
    // }
    if (currentProps.isAllYnewsListEmpty !== nextProps.isAllYnewsListEmpty) {
      return true;
    } else {
      return false;
    }
  };

  componentDidMount() {
    // this.props.actions.fetchCategoryNews('top_stories');
    this.props.actions.fetchAllYnews(1);
  }

  moveToPage = index => {
    console.log('logINdex', index);
    this.viewpager.setPage(index);
  };

  onPageSelected = ({nativeEvent: {position}}) => {
    if (position === 2) {
      this.props.actions.setWebViewVisiblity(true);
    } else {
      this.props.actions.setWebViewVisiblity(false);
    }
  };

  render() {
    const {isNewsListEmpty, newsListLength, isAllYnewsListEmpty} = this.props;
    // console.log('isNewsListEmpty', isNewsListEmpty, newsListLength);
    if (Platform.OS === 'android' || Platform.OS === 'ios') {
      // console.log(
      //   'isAllYnewsListEmpty',
      //   isAllYnewsListEmpty,
      //   this.props.allYnewsListLength,
      // );
      return (
        <View style={styles.container}>
          {/* <StatusBar backgroundColor={BLACK} /> */}
          <ViewPager
            ref={viewpager => {
              this.viewpager = viewpager;
            }}
            style={styles.viewPager}
            initialPage={0}
            onPageSelected={this.onPageSelected}>
            <View>
              <MenuNavigationScreen moveToPage={this.moveToPage} />
            </View>
            <View>
              {/* <Text>{JSON.stringify(this.props.allYnews)}</Text> */}
              {isAllYnewsListEmpty ? (
                <ShortsLoader />
              ) : (
                <NewsStackScreen moveToPage={this.moveToPage} />
              )}
            </View>
            <View>
              <WebScreen moveToPage={this.moveToPage} />
            </View>
          </ViewPager>
        </View>
      );
    } else {
      return null;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewPager: {
    flex: 1,
    marginTop: 0,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default connect(
  state => (
    console.log('state', state),
    {
      isNewsListEmpty: state.news.newsList.length === 0,
      newsListLength: state.news.newsList.length,
      isAllYnewsListEmpty: state.news.allYnews.length === 0,
      // allYnewsListLength: state.news.allYnews.length,
    }
  ),
  dispatch => ({
    actions: bindActionCreators(
      {
        setWebViewVisiblity,
        fetchCategoryNews,
        fetchAllYnews,
      },
      dispatch,
    ),
  }),
)(HomeScreen);
