import React from 'react';
import Carousel from 'react-native-snap-carousel';
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
import YnewsCard from '../components/YnewsCArd';

const AllNews = props => {
  const {allYnews, categoryId} = props;
  const SCREEN_WIDTH = getScreenWidth();

  React.useEffect(() => {
    props.actions.fetchAllYnews(categoryId, 1);
  }, []);

  const _renderYnewsItem = ({item, index}) => {
    return (
      <YnewsCard
        moveToPage={props.moveToPage}
        key={String(index)}
        data={item}
      />
    );
  };
  const onSlideChange = slideIndex => {
    console.log('Currentslide', slideIndex);
    props.actions.setCurrentNewsSlideIndex(slideIndex);
  };

  const handleEndReached = () => {
    const {
      selectedCategory,
      newsOffset,
      selectedTopicId,
      page,
      currentNewsSlideIndex,
    } = props;
    console.log('YnewsPage', page);
    if (page > 1 && allYnews.length > 10) {
      props.actions.fetchAllYnews(categoryId, page + 1);
    } else {
      console.log('cal');
      props.actions.fetchAllYnews(categoryId, 1);
    }
  };
  return (
    <Carousel
      data={allYnews.length > 0 && allYnews}
      renderItem={_renderYnewsItem}
      sliderWidth={SCREEN_WIDTH}
      sliderHeight={getScreenHeight()}
      itemWidth={SCREEN_WIDTH}
      itemHeight={getScreenHeight()}
      onSnapToItem={onSlideChange}
      swipeThreshold={70}
      onEndReached={handleEndReached}
      inactiveSlideOpacity={1}
      inactiveSlideScale={1}
      vertical={true}
      nestedScrollEnabled
      windowSize={10}
      initialNumToRender={10}
    />
  );
};

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
    categoryId: state.news.categoryId,
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
)(AllNews);
