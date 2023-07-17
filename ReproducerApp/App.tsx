import React from 'react';
import {Dimensions, FlatList, StyleSheet, Text, View} from 'react-native';

const {height: SCREEN_HEIGHT} = Dimensions.get('screen');

const data = Array.from({length: 30}, (_, index) => ({
  id: `${index + 1}`,
  text: `Item ${index + 1}`,
}));

const multiplier = 1.0;

export default function App() {
  const [animatedVerticalScroll, setAnimatedVerticalScroll] = React.useState(0);
  // used to detect stutters
  const previousValue = React.useRef(0);

  const listAnimatedStyle = {
    top:
      animatedVerticalScroll * multiplier > SCREEN_HEIGHT * 0.7
        ? 0
        : SCREEN_HEIGHT * 0.7 - animatedVerticalScroll * multiplier,
  };

  const renderItem = ({item}) => (
    <View style={styles.item}>
      <Text>{item.text}</Text>
    </View>
  );

  const scrollHandler = event => {
    // logger to detect if there was a stutter
    if (previousValue.current > event.nativeEvent.contentOffset.y) {
      console.log(
        `\nScrolling stuttered!\nPrevious offset was ${previousValue.current}\nCurrent offset is ${event.nativeEvent.contentOffset.y}\n`,
      );
    } else {
      console.log(event.nativeEvent.contentOffset.y);
    }
    setAnimatedVerticalScroll(event.nativeEvent.contentOffset.y);
    previousValue.current = event.nativeEvent.contentOffset.y;
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerBehind}>
        <Text>Multiplier: {multiplier}</Text>
      </View>
      <FlatList
        data={data}
        renderItem={renderItem}
        style={[styles.listContainer, listAnimatedStyle]}
        onScroll={scrollHandler}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerBehind: {
    width: '100%',
    height: '100%',
    flex: 1,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
  listContainer: {
    top: 0,
    left: 0,
    position: 'absolute',
    zIndex: 10,
    width: '100%',
    height: '100%',
    backgroundColor: 'green',
  },
  item: {
    height: 50,
  },
});
