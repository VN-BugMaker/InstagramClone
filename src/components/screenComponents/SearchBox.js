import { View, Text, TextInput } from 'react-native';
import React from 'react';
import { search } from '../../styles/search';
import { Search_SVG_Cli } from '../../svg-view';

const SearchBox = () => {
    return (
        <View style={search.component}>
            <Search_SVG_Cli width={16} style={search.itemSearch} />
            <TextInput
                placeholder='Tìm kiếm'
                placeholderTextColor={'#909090'}
                style={search.searchText}
            />
            
        </View>
    )
}

export default SearchBox