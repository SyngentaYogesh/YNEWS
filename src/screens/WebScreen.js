import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import {WebView} from 'react-native-webview';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {connect} from 'react-redux';
import {BLACK, WHITE} from '../constants/Colors';
import {FONT_SIZE_SMALL} from '../constants/Dimens';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {getScreenHeight} from '../helpers/DimensionsHelper';
import {bindActionCreators} from 'redux';

import {
  setCurrentNewsSlideIndex,
  fetchCategoryNews,
  fetchTopicNews,
  fetchAllYnews,
} from '../reducers/news';

const SCREEN_HEIGHT = getScreenHeight();
const STATUS_BAR_HEIGHT = getStatusBarHeight();

class WebScreen extends Component {
  handleBackOnPress = () => {
    this.props.moveToPage(1);
  };
  componentDidMount = () => {
    // const {selectedCategory} = this.props;
    // this.props.actions.fetchCategoryNews(selectedCategory);
    // this.props.actions.fetchAllYnews(1);
  };

  render() {
    const {isWebViewVisible, currentSlideData, allYnews} = this.props;
    // if (!isWebViewVisible || !currentSlideData) {
    //   return <View style={styles.container} />;
    // }
    console.log(
      'currentSlideData1',
      allYnews && allYnews.length,
      this.props.currentNewsSlideIndex,
    );
    // const {link, title} = currentSlideData;
    // const {source_name, source_url} = news_obj;
    // console.log('currentSlideData', currentSlideData);

    return (
      <View style={styles.container}>
        <View style={styles.top}>
          <Icon
            name="chevron-left"
            color={WHITE}
            size={STATUS_BAR_HEIGHT * 0.8}
            onPress={this.handleBackOnPress}
          />
          <Text style={styles.title}>
            {currentSlideData && currentSlideData.title.rendered}
          </Text>
          <Icon name="more-vert" color={WHITE} size={STATUS_BAR_HEIGHT * 0.7} />
        </View>
        <View>
          {/* <Text>{JSON.stringify(this.props.currentSlideData)}</Text> */}
        </View>
        <View style={styles.webViewContainer}>
          <WebView
            source={{
              uri: currentSlideData && currentSlideData.link,
            }}
            style={styles.webView}
            startInLoadingState
            scrollEnabled
            scalesPageToFit
            javaScriptEnabled={true}
            zoomable={false}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
  },
  top: {
    height: STATUS_BAR_HEIGHT,
    backgroundColor: BLACK,
    color: WHITE,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 10,
  },
  title: {
    color: WHITE,
    fontSize: FONT_SIZE_SMALL,
  },
  webViewContainer: {
    minHeight: SCREEN_HEIGHT + 30,
  },
});

export default connect(
  state =>
    // console.log('state', state),
    ({
      currentNewsSlideIndex: state.news.currentNewsSlideIndex,
      isWebViewVisible: state.news.isWebViewVisible,
      allYnews: state.news.allYnews,
      // currentSlideData: state.news.newsList[state.news.currentNewsSlideIndex]
      //   ? state.news.newsList[state.news.currentNewsSlideIndex]
      //   : null,
      currentSlideData: state.news.allYnews[state.news.currentNewsSlideIndex]
        ? state.news.allYnews[state.news.currentNewsSlideIndex]
        : null,
    }),
  dispatch => ({
    actions: bindActionCreators({fetchAllYnews}, dispatch),
  }),
)(WebScreen);
