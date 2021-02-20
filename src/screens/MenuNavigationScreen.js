import React, {Component} from 'react';
import {
  Text,
  TextInput,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import FastImage from 'react-native-fast-image';
import {getScreenHeight, getScreenWidth} from '../helpers/DimensionsHelper';
import {
  LIGHT_BLUE,
  BLACK,
  DARKER_GRAY,
  GRAY,
  WHITE,
  YNEWS_BRAND,
} from '../constants/Colors';
import {
  FONT_SIZE_LARGE,
  FONT_SIZE_NORMAL,
  FONT_SIZE_SMALL,
} from '../constants/Dimens';
import {
  fetchTrendingTopics,
  fetchTopicNews,
  fetchCategoryYnews,
  selectTopic,
  fetchYnewsTrendingTopics,
  fetchAllYnews,
} from '../reducers/news';
import {
  NEWS_CATEGORIES,
  FONT_BOLD,
  FONT_BLACK,
  FONT_SIZE_REGULAR,
} from '../constants/Constants';
import {selectCategory, fetchCategoryNews} from '../reducers/news';
import LinearGradient from 'react-native-linear-gradient';

const SCREEN_WIDTH = getScreenWidth();
const MARGIN_HORIZONTAL = 8;
const ITEM_WIDTH = (SCREEN_WIDTH - MARGIN_HORIZONTAL * 2) / 3;

class MenuNavigationScreen extends Component {
  state = {
    selectedTopic: null,
  };

  componentDidMount = () => {
    // this.props.actions.fetchTrendingTopics();
    this.props.actions.fetchYnewsTrendingTopics();
  };

  handleMenuOnPress = item => {
    console.log('all', item);
    const {id} = item;
    this.props.actions.selectTopic(id);
    // this.props.actions.fetchTopicNews(tag, 1);
    this.props.actions.fetchCategoryYnews(id, 1);
    this.props.moveToPage(1);
  };

  renderCategoriesHeader = () => {
    return (
      <View style={styles.titleContent}>
        {/* <Text style={styles.contentTitle}>CATEGORIES</Text> */}
        {/* <View style={styles.divider} /> */}
      </View>
    );
  };

  handleCategoryOnPress = item => {
    console.log('shortcut id', item);
    if (item.id !== 'all_news') {
      this.props.actions.selectCategory(item.id);
      this.props.actions.fetchCategoryNews(item.id);
      this.props.moveToPage(1);
    } else {
      this.props.actions.selectCategory(item.id);
      this.props.actions.fetchAllYnews(1);
      this.props.moveToPage(1);
    }
  };

  renderCategoriesContent = () => {
    const {selectedCategory} = this.props;
    return (
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {NEWS_CATEGORIES.map((category, index) => {
          const {id, label, icon} = category;
          const isSelected = id === selectedCategory;
          return (
            <TouchableOpacity
              key={String(id)}
              onPress={() => this.handleCategoryOnPress(category)}>
              <View
                style={{
                  alignItems: 'center',
                  marginHorizontal: 25,
                  marginVertical: 8,
                  opacity: isSelected ? 1 : 0.6,
                }}>
                <FastImage
                  style={{width: SCREEN_WIDTH / 10, height: SCREEN_WIDTH / 10}}
                  source={{
                    uri: icon,
                  }}
                  resizeMode={FastImage.resizeMode.contain}
                />
                <Text
                  style={[
                    styles.categoryLabel,
                    isSelected ? styles.selectedCategoryText : null,
                  ]}>
                  {label}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    );
  };

  renderSuggestedTopicsHeader = () => {
    return (
      <View style={styles.titleContent}>
        <Text style={styles.contentTitle}>CATEGORIES</Text>
        <View style={styles.divider} />
      </View>
    );
  };

  renderSuggestedTopicsContent = () => {
    const {selectedTopicId} = this.props;
    return (
      <View style={styles.menusContainer}>
        {this.props.trendingTopics.map((item, index) => {
          // const {tag, image_url, label} = item;
          const {name, slug, id} = item;
          return (
            <View style={styles.menuOuterWrapper} key={String(index)}>
              <TouchableOpacity
                style={[
                  styles.menuInnerWrapper,
                  {
                    height: styles.menuOuterWrapper.height - 10,
                    position: 'relative',
                  },
                ]}
                onPress={() => this.handleMenuOnPress(item)}
                key={String(index)}>
                <FastImage
                  style={{flex: 1}}
                  source={{
                    uri:
                      'https://upload.wikimedia.org/wikipedia/commons/a/a0/APK_format_icon.png',
                  }}
                  resizeMode={FastImage.resizeMode.stretch}
                />
                <LinearGradient
                  colors={['#FFFFFF00', '#FFFFFFDD', '#FFFFFFFF']}
                  style={[
                    {height: styles.menuOuterWrapper.height / 4},
                    styles.absoluteBottom,
                  ]}
                />
                <Text
                  style={styles.topicLabel}
                  numberOfLines={1}
                  ellipsizeMode="tail">
                  {name}
                </Text>
                {id === selectedTopicId ? (
                  <View
                    style={[
                      {flex: 1},
                      styles.absolute,
                      {backgroundColor: YNEWS_BRAND, opacity: 0.4},
                    ]}
                  />
                ) : null}
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    );
  };

  renderMainHeader = () => {
    return (
      <View style={styles.mainHeader}>
        {/* <Text style={styles.contentTitle}>CATEGORIES</Text> */}
        {/* <View style={styles.divider} /> */}
      </View>
    );
  };

  renderSearchInput = () => {
    return (
      <View style={styles.searchInput}>
        <TextInput
          placeholder={'Search Post'}
          style={{
            // height: 100,
            // width: 100,
            borderColor: 'gray',
            borderWidth: 1,
          }}
          // onChangeText={searchedTitle => (
          //   <Card title={shows.data.searchedTitle} />
          // )}
        />
      </View>
    );
  };

  renderCategories = () => {
    return (
      <React.Fragment>
        {/* {this.renderCategoriesHeader()} */}
        {this.renderMainHeader()}
        {this.renderSearchInput()}
        {this.renderCategoriesContent()}
      </React.Fragment>
    );
  };

  renderSuggestedTopics = () => {
    return (
      <React.Fragment>
        {this.renderSuggestedTopicsHeader()}
        {this.renderSuggestedTopicsContent()}
      </React.Fragment>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
          {this.renderCategories()}
          {this.renderSuggestedTopics()}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 0,
    marginTop: 0,
  },
  scrollView: {
    flex: 1,
  },
  menusContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: MARGIN_HORIZONTAL,
  },
  menuOuterWrapper: {
    width: ITEM_WIDTH,
    height: ITEM_WIDTH * 1.3,
    paddingHorizontal: 5,
    marginVertical: 1,
  },
  menuInnerWrapper: {
    borderColor: YNEWS_BRAND + 'AA',
    borderWidth: 1.5,
    borderRadius: 4,
  },
  absolute: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  absoluteBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  searchInput: {
    marginTop: 30,
    marginHorizontal: MARGIN_HORIZONTAL + 4,
    borderRadius: 1,
  },
  titleContent: {
    marginHorizontal: MARGIN_HORIZONTAL + 4,
  },
  contentTitle: {
    marginTop: 30,
    fontSize: FONT_SIZE_LARGE,
    fontFamily: FONT_BLACK,
    fontWeight: '900',
    color: DARKER_GRAY,
  },
  divider: {
    width: 25,
    height: 2,
    backgroundColor: DARKER_GRAY,
    borderRadius: 4,
    marginTop: 10,
    marginBottom: 20,
  },
  topicLabel: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    marginHorizontal: 6,
    marginVertical: 6,
    fontSize: FONT_SIZE_REGULAR,
    fontFamily: FONT_BOLD,
    fontWeight: '700',
  },
  categoryLabel: {
    marginTop: 16,
    fontSize: FONT_SIZE_NORMAL,
    fontFamily: FONT_BOLD,
    fontWeight: '700',
    color: GRAY,
  },
  selectedCategoryText: {
    color: YNEWS_BRAND,
  },
  mainHeader: {
    flex: 1,
  },
});

export default connect(
  state => ({
    trendingTopics: state.news.trendingTopics,
    selectedCategory: state.news.selectedCategory,
    selectedTopicId: state.news.selectedTopicId,
  }),
  dispatch => ({
    actions: bindActionCreators(
      {
        fetchYnewsTrendingTopics,
        fetchTrendingTopics,
        selectCategory,
        fetchCategoryNews,
        fetchTopicNews,
        fetchCategoryYnews,
        selectTopic,
        fetchAllYnews,
      },
      dispatch,
    ),
  }),
)(MenuNavigationScreen);
