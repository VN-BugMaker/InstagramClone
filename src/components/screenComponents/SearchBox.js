import { View, Text, TextInput, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import { Search_SVG_Cli } from '../../svg-view';

const SearchBox = () => {
  return (
    <View style={styles.component}>
      {/* <Search_SVG_Cli width={16} style={styles.itemSearch} />
      <TextInput
        placeholder="Tìm kiếm"
        placeholderTextColor={'#909090'}
        style={styles.searchText}
      /> */}
    </View>
  );
};
const styles = StyleSheet.create({
  component: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    position: 'relative'
  },
  itemSearch: {
    position: 'absolute',
    zIndex: 1,
    left: 25
  },
  searchText: {
    width: '94%',
    backgroundColor: '#EBEBEB',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 15,
    padding: 4,
    paddingLeft: 40
  }
});

export default SearchBox;
