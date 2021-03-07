import React, {Component} from 'react';
import {Text, StyleSheet, View, Dimensions} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import NewsCard from '../components/NewsCard';
import YnewsCard from '../components/YnewsCArd';
import SliderTest from '../components/slidereTest';

import {getScreenWidth, getScreenHeight} from '../helpers/DimensionsHelper';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  setCurrentNewsSlideIndex,
  fetchCategoryNews,
  fetchTopicNews,
  fetchAllYnews,
  fetchYnewsTrendingTopics,
} from '../reducers/news';
import ShortsLoader from '../components/ShortsLoader';
import {scrollInterpolator, animatedStyles} from '../utils/animations';

const SCREEN_WIDTH = getScreenWidth();

class NewsStackScreen extends Component {
  state = {
    activeSlide: 0,
    viewport: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
    index: 0,
    page: 1,
    refreshing: false,
  };
  constructor(props) {
    super(props);
    this._renderYnewsItem = this._renderYnewsItem.bind(this);

    // console.log('navprops', this.props);
  }
  _renderItem({item, index}) {
    return <NewsCard key={String(index)} data={item} />;
  }

  _renderYnewsItem({item, index}) {
    return (
      <YnewsCard
        moveToPage={this.props.moveToPage}
        key={String(index)}
        data={item}
      />
    );
  }

  componentDidMount = () => {
    // const {selectedCategory} = this.props;
    // this.props.actions.fetchCategoryNews(selectedCategory);
    this.props.actions.fetchAllYnews(null, 1);
  };

  handleEndReached = () => {
    const {
      selectedCategory,
      newsOffset,
      selectedTopicId,
      page,
      currentNewsSlideIndex,
    } = this.props;
    console.log('YnewsPage', page);
    if (page > 0 && !selectedTopicId) {
      this.props.actions.fetchAllYnews(page + 1);
    } else {
      console.log('cal');
      this.props.actions.fetchYnewsTrendingTopics(selectedTopicId, page + 1);
    }

    // if (!this.props.isLoading) {
    // if (!selectedTopicId) {
    //   this.props.actions.fetchCategoryNews(selectedCategory, newsOffset);
    // } else {
    //   this.props.actions.fetchYnewsTrendingTopics(selectedTopicId, page + 1);
    // }
    // }
  };

  onSlideChange = slideIndex => {
    console.log('Currentslide', slideIndex);
    this.props.actions.setCurrentNewsSlideIndex(slideIndex);
  };

  _handleRefresh = () => {
    console.log('refreshing...');

    this.setState(
      {
        page: 1,
        refreshing: true,
      },
      () => {
        this._fetchAllBeers();
      },
    );
  };
  render() {
    const {newsList, allYnews} = this.props;
    // console.log('NewsStackProps', allYnews);
    const SLIDER_WIDTH = Dimensions.get('window').width;
    const SLIDER_HEIGHT = Dimensions.get('window').height;
    const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
    const ITEM_HEIGHT = Math.round((ITEM_WIDTH * 3) / 4);
    return (
      // <View style={{flex: 1}}>
      //   <Carousel
      //     data={newsList}
      //     renderItem={this._renderItem}
      //     sliderWidth={SCREEN_WIDTH}
      //     sliderHeight={getScreenHeight()}
      //     itemWidth={SCREEN_WIDTH}
      //     itemHeight={getScreenHeight()}
      //     inactiveSlideOpacity={1}
      //     inactiveSlideScale={1}
      //     vertical={true}
      //     swipeThreshold={70}
      //     onEndReached={this.handleEndReached}
      //     nestedScrollEnabled
      //     windowSize={5}
      //     onSnapToItem={this.onSlideChange}
      //     // ListEmptyComponent={<ShortsLoader />}
      //   />
      // </View>
      //---UI For Ynews Carousal---//
      <View style={{flex: 1}}>
        <Carousel
          // onRefresh={this._handleRefresh}
          // refreshing={this.state.refreshing}
          // ref={c => (this.carousel = c)}
          // data={allYnews}
          data={allYnews && allYnews}
          renderItem={this._renderYnewsItem}
          sliderWidth={SCREEN_WIDTH}
          sliderHeight={getScreenHeight()}
          itemWidth={SCREEN_WIDTH}
          itemHeight={getScreenHeight()}
          onSnapToItem={this.onSlideChange}
          // onBeforeSnapToItem={this.handleEndReached}
          swipeThreshold={70}
          onEndReached={this.handleEndReached}
          inactiveSlideOpacity={1}
          inactiveSlideScale={1}
          vertical={true}
          nestedScrollEnabled
          windowSize={10}
          initialNumToRender={10}
          // pageSize={10}
          // onEndReachedThreshold={1}
          //   useScrollView={true}
        />
        {/* <Text style={styles.counter}>{this.state.index}</Text> */}
        {/* </View> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  carouselContainer: {
    marginTop: 0,
  },
});

export default connect(
  state => ({
    isLoading: state.news.isLoading,
    newsList: state.news.newsList,
    allYnews: state.news.allYnews,
    currentNewsSlideIndex: state.news.currentNewsSlideIndex,
    selectedCategory: state.news.selectedCategory,
    newsOffset: state.news.newsOffset,
    selectedTopicId: state.news.selectedTopicId,
    page: state.news.page,
  }),
  dispatch => ({
    actions: bindActionCreators(
      {
        setCurrentNewsSlideIndex,
        fetchCategoryNews,
        fetchTopicNews,
        fetchAllYnews,
        fetchYnewsTrendingTopics,
      },
      dispatch,
    ),
  }),
)(NewsStackScreen);
