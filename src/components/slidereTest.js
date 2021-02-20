import React, {Component} from 'react';
import {Text, View, Dimensions, StyleSheet} from 'react-native';

import Carousel from 'react-native-snap-carousel'; // Version can be specified in package.json

import {scrollInterpolator, animatedStyles} from '../utils/animations';
import YnewsCard from './YnewsCArd';

const SLIDER_WIDTH = Dimensions.get('window').width;
const SLIDER_HEIGHT = Dimensions.get('window').height;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
const ITEM_HEIGHT = Math.round((ITEM_WIDTH * 3) / 4);

const DATA = [];
for (let i = 0; i < 10; i++) {
  DATA.push(i);
}

export default class SliderTest extends Component {
  state = {
    index: 0,
  };

  constructor(props) {
    super(props);
    this._renderItem = this._renderItem.bind(this);
  }

  //   _renderItem({item}) {
  //     return (
  //       <View style={styles.itemContainer}>
  //         <Text style={styles.itemLabel}>{item.title.rendered}</Text>
  //       </View>
  //     );
  //   }
  _renderItem({item, index}) {
    return (
      <YnewsCard
        moveToPage={this.props.moveToPage}
        key={String(index)}
        data={item}
      />
    );
  }

  render() {
    const {data} = this.props;
    return (
      <View>
        <Carousel
          vertical={true}
          ref={c => (this.carousel = c)}
          data={data}
          renderItem={this._renderItem}
          sliderWidth={SLIDER_WIDTH}
          itemWidth={ITEM_WIDTH}
          sliderHeight={SLIDER_HEIGHT}
          itemHeight={SLIDER_HEIGHT}
          containerCustomStyle={styles.carouselContainer}
          inactiveSlideShift={0}
          onSnapToItem={this.onSlideChange}
          scrollInterpolator={scrollInterpolator}
          slideInterpolatedStyle={animatedStyles}
          //   useScrollView={true}
        />
        {/* <Text style={styles.counter}>{this.state.index}</Text> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  carouselContainer: {
    marginTop: 0,
  },
  itemContainer: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'dodgerblue',
  },
  itemLabel: {
    color: 'white',
    fontSize: 24,
  },
  counter: {
    marginTop: 0,
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
