import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import React, { useContext, useEffect, useRef, useState } from 'react';
import Dot from 'react-native-vector-icons/Entypo';
import Ionic from 'react-native-vector-icons/Ionicons';
import { VideoSvg } from '../../svg-view';
import { AuthContext } from '../../context/AuthContext';
import { ScrollView } from 'react-native-virtualized-view';
import { URL } from './api/Url';
const MessageDetail = ({ route, navigation }) => {
  const { userToken } = useContext(AuthContext);
  const { username, avatar, _id, fullname } = route.params;
  const [reload, setReload] = useState(false);
  const [message, setMessage] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pageCurrent, setPageCurrent] = useState(1);
  const page = useRef();

  useEffect(() => {
    setIsLoading(true);
    getDetailMessage();
  }, [pageCurrent]);
  const getDetailMessage = async () => {
    await fetch(`${URL}/api/message/${_id}?limit=${14 * pageCurrent}`, {
      method: 'GET',
      headers: { Authorization: userToken }
    })
      .then((res) => res.json())
      .then((res) => {
        setMessage([...res.messages.map((item) => item)]);
        setReload(false);
        setIsLoading(false);
      });
  };
  const renderFooter = () => {
    return (
      message && (
        <View style={styles.body}>
          <Image
            source={{ uri: avatar }}
            style={{
              width: 100,
              height: 100,
              borderRadius: 100,
              marginLeft: 20
            }}
          />
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{fullname}</Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Text style={{ fontSize: 16 }}>{username}</Text>
            <Dot
              name="dot-single"
              style={{ fontSize: 6, paddingHorizontal: 3 }}
            />
            <Text style={{ fontSize: 16 }}>Instagram</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              opacity: 0.4
            }}
          >
            <Text style={{ fontSize: 16 }}>12 người theo dõi</Text>
            <Dot
              name="dot-single"
              style={{ fontSize: 6, paddingHorizontal: 3 }}
            />
            <Text style={{ fontSize: 16 }}>3 bài viết</Text>
          </View>
        </View>
      )
    );
  };
  const handleLoadMore = () => {
    if (!isLoading) {
      setPageCurrent(pageCurrent + 1);
      setIsLoading(true);
    }
  };
  const renderMessage = ({ item }) => {
    return (
      <View>
        {item.sender === _id ? (
          <View
            style={{
              flexDirection: 'row',
              marginBottom: 20,
              alignItems: 'center'
            }}
          >
            <Image
              source={{ uri: avatar }}
              style={{
                width: 30,
                height: 30,
                borderRadius: 30,
                marginLeft: 20
              }}
            />

            {item.text ? (
              <View
                style={{
                  backgroundColor: '#efefef',
                  borderRadius: 18,
                  marginLeft: 12,
                  paddingEnd: 10,
                  flexDirection: 'row',
                  maxWidth: '60%',
                  padding: 10
                }}
              >
                <Text>{item.text}</Text>
              </View>
            ) : item.call ? (
              <View
                style={{
                  backgroundColor: '#efefef',
                  borderRadius: 18,
                  marginLeft: 12,
                  paddingEnd: 10,
                  flexDirection: 'row',
                  maxWidth: '60%',
                  padding: 10,
                  width: '50%',
                  height: 65
                }}
              >
                {item.call.video ? (
                  <Text>{1}</Text>
                ) : (
                  <Text>{item.call.times}</Text>
                )}
              </View>
            ) : (
              item.media.map((item, index) => {
                return (
                  <View
                    key={index}
                    style={{
                      backgroundColor: '#ffffff',
                      borderRadius: 18,
                      marginLeft: 12,
                      flexDirection: 'row'
                    }}
                  >
                    <Image
                      source={{
                        uri: item.url
                      }}
                      style={{
                        width: 150,
                        height: 150,
                        marginLeft: 20
                      }}
                    />
                  </View>
                );
              })
            )}
          </View>
        ) : (
          <View
            style={{
              flexDirection: 'row',
              marginBottom: 20,
              justifyContent: 'flex-end'
            }}
          >
            <View
              style={{
                backgroundColor: '#3897F0',
                borderRadius: 18,
                marginRight: 12,
                paddingEnd: 10,
                flexDirection: 'row',
                maxWidth: '60%',
                padding: 10
              }}
            >
              {item.text ? (
                <Text>{item.text}</Text>
              ) : item.call ? (
                <Text>{item.call.times}</Text>
              ) : (
                <Image
                  source={{ uri: item.media.map((item) => item.url) }}
                  style={{
                    width: 100,
                    height: 100,
                    marginLeft: 20
                  }}
                />
              )}
            </View>
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionic
          onPress={() => navigation.goBack()}
          name="arrow-back"
          style={styles.arrowBack}
        />
        <Image
          source={{ uri: avatar }}
          style={{ width: 30, height: 30, borderRadius: 30, marginLeft: 20 }}
        />
        <View style={styles.insideHeader}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '90%'
            }}
          >
            <View>
              <Text style={styles.fullnameProfile}>{fullname}</Text>
              <Text style={styles.usernameProfile}>{username}</Text>
            </View>
            <View style={{ flexDirection: 'row', marginRight: 10 }}>
              <Ionic
                name="ios-call-outline"
                style={{ fontSize: 24, paddingRight: 20 }}
              />
              <VideoSvg />
            </View>
          </View>
        </View>
      </View>

      {/* content */}

      <FlatList
        showsVerticalScrollIndicator={false}
        scrollEnabled={true}
        data={message}
        renderItem={(item) => renderMessage(item)}
        keyExtractor={(item, index) => String(index)}
        // ListHeaderComponent={() => renderHeader()}
        ListFooterComponent={() => renderFooter()}
        // ItemSeparatorComponent={handleLoadMore}
        // stickyHeaderIndices={[10]}
        initialNumToRender={14}
        maxToRenderPerBatch={14}
        windowSize={10}
        onEndReachedThreshold={100}
        onEndReached={handleLoadMore}
        ref={page}
        inverted
      />
      <View
        style={{
          marginBottom: 60
        }}
      ></View>

      <View
        style={{
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#efefef',
          width: '94%',
          bottom: 15,
          margin: 15,
          position: 'absolute',
          borderRadius: 20
        }}
      >
        <TextInput
          style={{ width: '88%', left: 15 }}
          blurOnSubmit={true}
          multiline={true}
          value={''}
          numberOfLines={3}
          placeholder="Nhắn tin..."
          //   onChangeText={(text) => setComment(text)}
          //   autoFocus
        />
        <TouchableOpacity style={{ right: 15 }}>
          <Text>Gửi</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MessageDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10
  },
  arrowBack: {
    fontSize: 30
  },
  insideHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%'
  },
  fullnameProfile: {
    fontSize: 17,
    fontWeight: 'bold',
    marginLeft: 16
  },
  usernameProfile: {
    fontSize: 15,
    marginLeft: 16,
    opacity: 0.4
  },
  body: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 100
  },
  loader: {
    marginTop: 100,
    marginBottom: 20,
    alignItems: 'center'
  }
});
