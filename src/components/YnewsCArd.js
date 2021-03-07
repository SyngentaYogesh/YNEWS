import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Linking,
  SafeAreaView,
  Modal,
  TouchableOpacity,
} from 'react-native';
import {Avatar, Card, IconButton, Title, Paragraph} from 'react-native-paper';
import FastImage from 'react-native-fast-image';
import HTMLView from 'react-native-htmlview';
import {
  FONT_SIZE_EXTRA_LARGE,
  FONT_SIZE_NORMAL,
  FONT_SIZE_LARGE,
  FONT_SIZE_SMALL,
} from '../constants/Dimens';
import {GRAY, WHITE, DARK_GRAY, NEWS_TITLE} from '../constants/Colors';
import {
  FONT_REGULAR,
  FONT_BOLD,
  FONT_MEDIUM,
  FONT_LIGHT,
  momentCalendarConfig,
} from '../constants/Constants';
import moment from 'moment';
// import ImagePreview from 'react-native-image-preview';
// import ImageViewer from 'react-native-image-zoom-viewer';
import ImageView from 'react-native-image-viewing';

import {getScreenHeight, getScreenWidth} from '../helpers/DimensionsHelper';

const SCREEN_WIDTH = getScreenWidth();
const SCREEN_HEIGHT = getScreenHeight();

export default class YnewsCard extends Component {
  state = {
    visible: false,
  };
  constructor(props) {
    super(props);
  }
  //   shouldComponentUpdate(nextProps, nextState) {
  //     const currentProps = this.props;
  //     if (currentProps.data.hash_id !== nextProps.data.hash_id) {
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   }

  //   getByLineText = () => {
  //     const {byline_1, created_at} = this.props.data.news_obj;
  //     if (!byline_1) {
  //       return null;
  //     }

  //     return byline_1
  //       .map(item => {
  //         const {type, text} = item;
  //         if (type === 'TEXT') {
  //           return text.trim();
  //         } else if (type === 'TIME') {
  //           return moment(created_at).calendar(null, momentCalendarConfig);
  //         } else {
  //           return '';
  //         }
  //       })
  //       .join(' ');
  //   };

  render() {
    // console.log('newsCaard', this.props);

    const {
      title,
      jetpack_featured_media_url,
      excerpt,
      content,
      slug,
      link,
    } = this.props.data;
    // const {colors} = this.props.theme;
    const OpenWebview = () => {
      console.log('chamari');
      this.props.moveToPage(2);
      // this.props.navigation.navigate('Browser', {url: 'https://google.com'});
    };
    // console.log('news_obj', this.props.data);
    return (
      // <Text>{JSON.stringify(title)}</Text>
      // <View style={styles.container}>
      //   <TouchableOpacity
      //     //   style={styles.top}
      //     onPress={() => {
      //       console.log('chamari');
      //       this.setState({visible: true});
      //     }}>
      //     <View style={{height: 200}}>
      //       <FastImage
      //         height={'100%'}
      //         width={'100%'}
      //         style={{flex: 1}}
      //         source={{
      //           uri: jetpack_featured_media_url && jetpack_featured_media_url,
      //         }}
      //         resizeMode={FastImage.resizeMode.cover}
      //       />
      //       <ImageView
      //         images={[{uri: jetpack_featured_media_url}]}
      //         imageIndex={0}
      //         visible={this.state.visible}
      //         onRequestClose={() => this.setState({visible: false})}
      //       />
      //     </View>
      //   </TouchableOpacity>
      //   <View style={[styles.middle, styles.contentPadding]}>
      //     <TouchableOpacity onPress={OpenWebview}>
      //       <HTMLView
      //         stylesheet={titleSheet}
      //         value={`<h1>${title && title.rendered}</h1>`}
      //       />
      //     </TouchableOpacity>
      //     <HTMLView
      //       // value={excerpt && excerpt.rendered.replace(/\n\s*/g, '')}
      //       value={excerpt && excerpt.rendered}
      //       stylesheet={contentstyles}
      //     />
      //   </View>
      //   {/* <View style={[styles.footer, styles.contentPadding]}>
      //     <Text
      //       style={styles.footerTitle}
      //       numberOfLines={1}
      //       ellipsizeMode="tail">
      //       {slug && slug}
      //     </Text>
      //     <Text
      //       style={styles.footerSubtitle}
      //       numberOfLines={1}
      //       ellipsizeMode="tail"
      //       onPress={e => console.log('url>>', e.target.value)}>
      //       view more click here
      //     </Text>
      //   </View> */}
      // </View>
      <Card>
        <TouchableOpacity
          onPress={() => {
            console.log('chamari');
            this.setState({visible: true});
          }}>
          <Card.Cover
            source={{
              uri: jetpack_featured_media_url && jetpack_featured_media_url,
            }}
          />
          <ImageView
            images={[{uri: jetpack_featured_media_url}]}
            imageIndex={0}
            visible={this.state.visible}
            onRequestClose={() => this.setState({visible: false})}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={OpenWebview}>
          <Card.Title
            titleStyle={{color: 'Black'}}
            title={() => {
              return (
                <HTMLView
                  stylesheet={titleSheet}
                  value={title && title.rendered}
                />
              );
            }}
            // subtitle="Card Subtitle"
            // left={props => <Avatar.Icon {...props} icon="folder" />}
            right={props => (
              <IconButton {...props} icon="more-vert" onPress={() => {}} />
            )}
          />
        </TouchableOpacity>
        <Card.Content>
          <TouchableOpacity onPress={OpenWebview}>
            <HTMLView
              stylesheet={titleSheet}
              value={`<h1>${title && title.rendered}</h1>`}
            />
          </TouchableOpacity>

          <HTMLView
            // value={excerpt && excerpt.rendered.replace(/\n\s*/g, '')}
            value={excerpt && excerpt.rendered}
            stylesheet={contentstyles}
          />
        </Card.Content>
      </Card>
    );
  }
}
const contentstyles = StyleSheet.create({
  p: {fontSize: 18},
  container: {
    // flex: 1,
    // width: '100%',
    backgroundColor: WHITE,
    // margin: 0,
    // padding: 0,
  },
});

const titleSheet = StyleSheet.create({
  h1: {
    fontFamily: FONT_REGULAR,
    fontWeight: '400',
    fontSize: FONT_SIZE_EXTRA_LARGE,
    // marginTop: 12,
  },
});
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: WHITE,
    margin: 0,
    padding: 0,
  },
  top: {
    backgroundColor: WHITE,
    flex: 1,
  },
  middle: {
    backgroundColor: WHITE,
    flex: 5,
  },
  footer: {
    flex: 1,
    backgroundColor: '#e5e5e5',
    justifyContent: 'center',
    backgroundColor: DARK_GRAY,
  },
  contentPadding: {
    paddingHorizontal: 12,
    paddingVertical: 0,
    marginVertical: 0,
  },
  title: {
    fontFamily: FONT_REGULAR,
    fontWeight: '400',
    fontSize: FONT_SIZE_EXTRA_LARGE,
    marginTop: 12,
  },
  description: {
    fontFamily: FONT_REGULAR,
    fontWeight: '400',
    fontSize: FONT_SIZE_SMALL,
    marginTop: 7,
    lineHeight: 25,
    color: GRAY,
    marginVertical: 0,
  },
  byLine: {
    fontFamily: FONT_LIGHT,
    fontWeight: '300',
    fontSize: FONT_SIZE_NORMAL,
    marginTop: 5,
    color: GRAY,
    opacity: 0.7,
  },
  footerTitle: {
    fontFamily: FONT_REGULAR,
    fontWeight: '400',
    color: WHITE,
    fontSize: FONT_SIZE_NORMAL,
    fontWeight: '600',
  },
  footerSubtitle: {
    color: WHITE,
    fontWeight: '300',
    fontFamily: FONT_LIGHT,
    fontSize: FONT_SIZE_SMALL,
    fontWeight: '400',
    marginTop: 2,
  },
});
