import * as React from 'react';
import {BottomNavigation, Text, Appbar} from 'react-native-paper';

import TopNews from './TopNews';
import AllNews from './AllNews';
import Categories from './Categories';

const _goBack = () => console.log('Went back');

const _handleSearch = () => console.log('Searching');

const _handleMore = () => console.log('Shown more');

const TabScreen = props => {
  console.log('Tabscreen props', props);
  const [index, setIndex] = React.useState(1);
  const [routes] = React.useState([
    {key: 'recents', title: 'Categories', icon: 'comment'},
    {key: 'music', title: 'Top News', icon: 'star'},
    {key: 'albums', title: 'All News', icon: 'home'},
  ]);

  const renderScene = BottomNavigation.SceneMap({
    recents: () => <Categories setIndex={val => setIndex(val)} />,
    albums: () => <AllNews moveToPage={val => props.moveToPage(val)} />,
    music: () => <TopNews moveToPage={val => props.moveToPage(val)} />,
  });

  return (
    <>
      <Appbar.Header>
        {/* <Appbar.BackAction onPress={_goBack} /> */}
        <Appbar.Content title="TizenHelp" subtitle="" />
        <Appbar.Action icon="magnify" onPress={_handleSearch} />
        <Appbar.Action icon="dots-vertical" onPress={_handleMore} />
      </Appbar.Header>
      <BottomNavigation
        navigationState={{index, routes}}
        onIndexChange={setIndex}
        renderScene={renderScene}
      />
    </>
  );
};

export default TabScreen;
