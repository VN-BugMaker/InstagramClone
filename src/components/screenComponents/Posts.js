import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import React, {
  useState,
  useRef,
  useContext,
  useEffect,
  useCallback
} from 'react';
import {
  Comment_SVG,
  Heart_SVG,
  Heart_SVG_Cli,
  Options_SVG,
  Save_SVG,
  Share_SVG
} from '../../svg-view';
import styles from '../../../assets/styles/styles';
import { AuthContext } from '../../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { URL } from './api/Url';

const Posts = () => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [idItem, setIdItem] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [pageCurrent, setPageCurrent] = useState(1);
  const { userToken, idUser, avatarUser, socket } = useContext(AuthContext);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoadLike, setIsLoadLike] = useState(false);
  useEffect(() => {
    socket.on('likeToClient', (newPost) => {
      fetch(`${URL}/api/post/${newPost._id}/like`, {
        method: 'PATCH',
        headers: { Authorization: userToken }
      });
      socket.emit('likePost', newPost);
      console.log(newPost._id);
      setIsLoadLike(!isLoadLike);
    });

    return () => socket.off('likeToClient');
  }, [socket]);
  useEffect(() => {
    socket.on('unLikeToClient', (newPost) => {
      fetch(`${URL}/api/post/${newPost._id}/unlike`, {
        method: 'PATCH',
        headers: { Authorization: userToken }
      });
      socket.emit('unLikePost', newPost);
      console.log(newPost._id);
      setIsLoadLike(!isLoadLike);
    });

    return () => socket.off('unLikeToClient');
  }, [socket]);
  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000000);
  };
  useEffect(() => {
    setIsLoading(true);
    const loadPosts = async () => {
      // console.log(pageCurrent);
      await fetch(`${URL}/api/posts?limit=${2 * pageCurrent}`, {
        method: 'GET',
        headers: { Authorization: userToken }
      })
        .then((res) => res.json())
        .then((res) => {
          setData([...res.posts]);
          setIsLoading(false);
          setTimeout(() => {
            AsyncStorage.removeItem('access_token');
            AsyncStorage.removeItem('idUser');
            AsyncStorage.removeItem('avatarUser');
            AsyncStorage.removeItem('username');
          }, 1000000);
        });
    };
    loadPosts();
  }, [pageCurrent, refreshing, isLoadLike]);

  const likePost = (idPost, data) => {
    fetch(`${URL}/api/post/${idPost}/like`, {
      method: 'PATCH',
      headers: { Authorization: userToken }
    });
    socket.emit('likePost', data);
  };

  const unlikePost = (idPost, data) => {
    fetch(`${URL}/api/post/${idPost}/unlike`, {
      method: 'PATCH',
      headers: { Authorization: userToken }
    });
    socket.emit('unLikePost', data);
  };

  const onViewableItemsChanged = useRef((item) => {
    setCurrentSlideIndex(item.viewableItems[0].index);
    setIdItem(item.viewableItems[0].index);
    // const newItem = ...item.viewableItems
    // console.log(item.viewableItems[0].index);
  });

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50
  });
  const renderImage = ({ item }) => {
    return (
      <Image
        source={{ uri: item.uri ? item.uri : item.url ? item.url : item }}
        style={styles.imagePost}
        resizeMethod={'resize'}
      />
    );
  };
  const handleLike = (item) => {
    likePost(item._id, item);
    setIsLoadLike(!isLoadLike);
  };
  const handleUnLike = (item) => {
    unlikePost(item._id, item);
    setIsLoadLike(!isLoadLike);
  };
  const renderPost = ({ item }) => {
    return (
      <View>
        <View style={styles.headerPost}>
          <Image
            source={{
              uri: item.user?.avatar
            }}
            style={styles.avatarPost}
            resizeMethod={'resize'}
          />
          <View style={styles.infoPost}>
            <Text style={styles.nameUser}>{item.user.username}</Text>
          </View>
          <View style={styles.optionPost}>
            <TouchableOpacity
              style={{ height: 18 }}
              onPress={() => console.log(item._id)}
            >
              <Options_SVG />
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <FlatList
            data={item.images}
            renderItem={renderImage}
            horizontal
            pagingEnabled
            keyExtractor={(item, index) => String(index)}
            showsHorizontalScrollIndicator={false}
            onViewableItemsChanged={onViewableItemsChanged.current}
            viewabilityConfig={viewabilityConfig.current}
          />
        </View>
        {item.images.length > 1 ? (
          <View style={styles.pagination}>
            <Text style={styles.paginationNumber}>
              {idItem + 1}/{item.images.length}
            </Text>
          </View>
        ) : null}

        <View style={styles.interactPost}>
          <View style={styles.likePost}>
            {item.likes.find((item) => item._id === idUser) ? (
              <TouchableOpacity onPress={() => handleUnLike(item)}>
                <Heart_SVG_Cli like="like" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => handleLike(item)}>
                <Heart_SVG handleLike />
              </TouchableOpacity>
            )}
            {/* <LikeButton
              isLike={isLike}
              handleLike={handleLike}
              handleUnLike={handleUnLike}
              idUser={idUser}
              item={item}
            /> */}
            <TouchableOpacity
              onPress={() =>
                navigation.push('Comments', {
                  id: item._id,
                  content: item.content,
                  userPost: item.user.username,
                  avatarUser: avatarUser
                })
              }
              style={styles.commentPost}
            >
              <Comment_SVG />
            </TouchableOpacity>
            <Share_SVG />
          </View>
          <View style={styles.pgPost}>
            {/* {item.images.length > 1 &&
              item.images.map((item, index) => {
                return (
                  <View
                    key={index}
                    style={{
                      width: currentSlideIndex === index ? 6 : 4,
                      height: currentSlideIndex === index ? 6 : 4,
                      borderRadius: 3,
                      backgroundColor:
                        currentSlideIndex === index ? '#3897F0' : 'black',
                      opacity: currentSlideIndex === index ? 1 : 0.15,
                      marginHorizontal: 2
                    }}
                  ></View>
                );
              })} */}
          </View>
          <View style={styles.savePost}>
            <Save_SVG />
          </View>
        </View>
        <View>
          <Text style={styles.detailLike}>{item.likes.length} lượt thích</Text>
        </View>
        <View style={styles.titlePost}>
          <Text style={styles.titleName}>{item.user.username}</Text>
          <Text style={styles.title}>{item.content}</Text>
        </View>
        <TouchableOpacity
          onPress={() =>
            navigation.push('Comments', {
              id: item._id,
              content: item.content,
              userPost: item.user.username,
              avatarUser: avatarUser
            })
          }
        >
          <Text style={styles.seenComment}>
            Xem tất cả {item.comments.length} bình luận
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
  const renderFooter = () => {
    return (
      isLoading && (
        <View style={{ marginTop: 15, alignItems: 'center' }}>
          <ActivityIndicator color={'#999999'} size={'large'} />
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
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={data}
        // horizontal={false}
        renderItem={(item) => renderPost(item)}
        keyExtractor={(item, index) => String(index)}
        initialNumToRender={2}
        maxToRenderPerBatch={8}
        windowSize={10}
        // showsVerticalScrollIndicator={true}
        scrollEnabled={false}
        ListFooterComponent={() => renderFooter()}
        onEndReachedThreshold={0.01}
        onEndReached={handleLoadMore}
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
    </View>
  );
};

export default Posts;
