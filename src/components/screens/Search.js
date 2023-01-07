import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  Animated,
  Button,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  FlatList,
  Image
} from 'react-native';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Search_SVG_Cli } from '../../svg-view';
import Ionic from 'react-native-vector-icons/Ionicons';
import { AuthContext } from '../../context/AuthContext';
import { URL } from '../screenComponents/api/Url';
const Search = () => {
  const { username, userToken, idUser } = useContext(AuthContext);
  const [searchBarFocused, setSearchBarFocused] = useState(false);
  const searchInput = useRef(new Animated.Value(390)).current;
  const [conversation, setConversation] = useState([]);

  const focusSearch = () => {
    Animated.timing(searchInput, {
      toValue: 350,
      duration: 100,
      useNativeDriver: false
    }).start();
    setSearchBarFocused(true);
  };
  const unFocusSearch = () => {
    Animated.timing(searchInput, {
      toValue: 390,
      duration: 100,
      useNativeDriver: false
    }).start();
    setSearchBarFocused(false);
  };
  const getConversations = async () => {
    await fetch(`${URL}/api/conversations`, {
      method: 'GET',
      headers: { Authorization: userToken }
    })
      .then((res) => res.json())
      .then((res) => {
        setConversation(
          res.conversations.map((item) => {
            return item;
          })
        );
      });
  };
  useEffect(() => {
    getConversations();
  }, []);

  const renderChat = ({ item }) => {
    return (
      <TouchableOpacity
        // onPress={() =>
        //   item.recipients.map((item, index) => {
        //     return (
        //       item._id !== idUser &&
        //       navigation.navigate('MessageDetail', {
        //         username: item.username,
        //         avatar: item.avatar,
        //         _id: item._id,
        //         fullname: item.fullname
        //       })
        //     );
        //   })
        // }
        style={styles.containerMessages}
      >
        <View style={styles.left}>
          <View>
            {item.recipients.map((item, index) => {
              return (
                item._id !== idUser && (
                  <Image
                    key={index}
                    source={{ uri: item.avatar }}
                    style={styles.avatar}
                  />
                )
              );
            })}
          </View>
          <View style={{ paddingLeft: 15 }}>
            <View style={{ flexDirection: 'row' }}>
              {item.recipients.map((item, index) => {
                return (
                  item._id !== idUser && (
                    <Text key={index} style={{ fontWeight: '600' }}>
                      {item.username}
                    </Text>
                  )
                );
              })}
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                opacity: 1 ? 1 : 0.4
              }}
            >
              <Text
                style={{
                  fontWeight: 'bold'
                }}
              >
                {item.text}
              </Text>

              {item.recipients.map((item, index) => {
                return (
                  item._id !== idUser && (
                    <Text key={index} style={{ fontWeight: 'bold' }}>
                      {item.username}
                    </Text>
                  )
                );
              })}
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={{ flex: 1, backgroundColor: '#ffffff', alignItems: 'flex-end' }}
    >
      {searchBarFocused ? (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <Ionic
            onPress={unFocusSearch}
            name="arrow-back"
            style={styles.arrowBack}
          />
        </TouchableWithoutFeedback>
      ) : null}
      <Animated.View style={[styles.component, { width: searchInput }]}>
        <Search_SVG_Cli
          width={16}
          style={[styles.itemSearch, { opacity: searchBarFocused ? 0.4 : 1 }]}
        />
        <TextInput
          onPressIn={focusSearch}
          placeholder="Tìm kiếm"
          placeholderTextColor={'#909090'}
          style={styles.searchText}
        />
      </Animated.View>

      {searchBarFocused ? (
        <View style={styles.containerMessage}>
          <FlatList
            data={conversation}
            renderItem={(item) => renderChat(item)}
            keyExtractor={(item, index) => String(index)}
          />
        </View>
      ) : (
        <View
          style={{
            backgroundColor: '#ffff',
            width: '100%',
            height: '100%'
          }}
        ></View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  component: {
    paddingVertical: 10,
    backgroundColor: '#EBEBEB',
    borderRadius: 10,
    paddingVertical: 4,
    paddingLeft: 40,
    height: 32,
    marginTop: 10,
    marginRight: 20
  },
  itemSearch: {
    position: 'absolute',
    zIndex: 1,
    left: 15,
    top: 8
  },
  searchText: {
    backgroundColor: '#EBEBEB',
    fontSize: 15,
    marginRight: 10
  },
  arrowBack: {
    fontSize: 25,
    position: 'absolute',
    zIndex: 1,
    left: 15,
    top: 12
  },
  containerMessage: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingTop: 16,
    alignSelf: 'baseline'
  },
  containerMessages: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 8
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  avatar: {
    width: 58,
    height: 58,
    borderRadius: 58
  },
  username: {
    fontWeight: 'bold'
  }
});

export default Search;
