import React from 'react';
import {View, ScrollView, TouchableOpacity} from 'react-native';
import {Text, List} from 'react-native-paper';
import {getScreenWidth, getScreenHeight} from '../helpers/DimensionsHelper';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  setCurrentNewsSlideIndex,
  fetchCategoryNews,
  fetchTopicNews,
  fetchAllYnews,
  fetchYnewsTrendingTopics,
  fetchCategoryYnews,
  setCurrentCategoryId,
} from '../reducers/news';

const Categories = props => {
  const {trendingTopics, isLoading} = props;
  console.log('Categories props', props);
  React.useEffect(() => {
    props.actions.fetchYnewsTrendingTopics();
  }, []);

  const getNewsByCategory = categoryId => {
    console.log('categoryId', categoryId);
    props.actions.setCurrentCategoryId(categoryId);
    props.setIndex(2);
  };

  return (
    <ScrollView>
      {trendingTopics.length > 0 &&
        trendingTopics.map((item, i) => {
          return (
            <List.Item
              key={i}
              onPress={() => getNewsByCategory(item.id)}
              titleStyle={{color: 'red'}}
              title={item.name}
              //   description="Item description"
              left={props => <List.Icon {...props} icon="lightbulb-on" />}
            />
          );
        })}
    </ScrollView>
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
    trendingTopics: state.news.trendingTopics,
  }),
  dispatch => ({
    actions: bindActionCreators(
      {
        setCurrentNewsSlideIndex,
        fetchCategoryNews,
        fetchTopicNews,
        fetchAllYnews,
        fetchYnewsTrendingTopics,
        fetchCategoryYnews,
        setCurrentCategoryId,
      },
      dispatch,
    ),
  }),
)(Categories);
