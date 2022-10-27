import { View, Text, ScrollView } from 'react-native';
import React from 'react';
import SearchBox from '../screenComponents/SearchBox';
import SearchContent from '../screenComponents/SearchContent';
const Search = () => {
  return (
    <View style={{flex:1}}>
      <SearchBox />
      <ScrollView>
        <SearchContent />
      </ScrollView>

    </View>
  )
}

export default Search