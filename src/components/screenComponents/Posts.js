import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import React, {
  useState,
  useRef,
  useContext,
  useEffect,
  useCallback
} from 'react';
import postData from '../../data/postData';
import {
  Comment_SVG,
  Heart_SVG,
  Heart_SVG_Cli,
  Options_SVG,
  Save_SVG,
  Share_SVG
} from '../../svg-view';
import styles from '../../../assets/styles/styles';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Posts = () => {
  const navigation = useNavigation();
  const [data, setData] = useState();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [idItem, setIdItem] = useState();
  const [isRender, setIsRender] = useState(false);
  const { userToken, idUser, avatarUser } = useContext(AuthContext);

  useEffect(() => {
    const loadPosts = async () => {
      await fetch('http://192.168.0.38:5000/api/posts', {
        method: 'GET',
        headers: { Authorization: userToken }
      })
        .then((res) => res.json())
        .then((res) => {
          setData(res.posts);
          setTimeout(() => {
            AsyncStorage.removeItem('access_token');
            AsyncStorage.removeItem('idUser');
            AsyncStorage.removeItem('avatarUser');
            AsyncStorage.removeItem('username');
          }, 10000000);
        });
    };
    loadPosts();
  }, [isRender]);

  const likePost = (idPost, like) => {
    fetch(`http://192.168.0.38:5000/api/post/${idPost}/${like}`, {
      method: 'PATCH',
      headers: { Authorization: userToken }
    });
  };
  const onViewableItemsChanged = useRef((item) => {
    setCurrentSlideIndex(item.viewableItems[0].index);
    setIdItem(item.viewableItems[0].index);
    // const newItem = ...item.viewableItems
    console.log(item.viewableItems[0].index);
  });

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50
  });

  const handleLike = (item) => {
    likePost(
      item._id,
      item.likes.find((item) => item._id === idUser) ? 'unlike' : 'like'
    );
    setIsRender(!isRender);
  };

  const renderImage = ({ item }) => {
    return (
      <Image
        source={{ uri: item.uri ? item.uri : item.url ? item.url : item }}
        style={styles.imagePost}
        resizeMethod={'resize'}
      />
    );
  };

  const renderPost = ({ item }) => {
    return (
      <View>
        <View style={styles.headerPost}>
          <Image
            source={{
              uri: item.user.avatar
            }}
            style={styles.avatarPost}
            resizeMethod={'resize'}
          />
          <View style={styles.infoPost}>
            <Text style={styles.nameUser}>{item.user.username}</Text>
          </View>
          <View style={styles.optionPost}>
            <Options_SVG />
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
            <TouchableOpacity delayPressIn={0} onPress={() => handleLike(item)}>
              {item?.likes.find((item) => item._id === idUser) ? (
                <Heart_SVG_Cli like="like" />
              ) : (
                <Heart_SVG />
              )}
            </TouchableOpacity>
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
            {item.images.length > 1 &&
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
              })}
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
  return (
    <View>
      <FlatList
        data={data}
        horizontal={false}
        renderItem={renderPost}
        keyExtractor={(item) => item._id}
        extraData={!isRender}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
      />
    </View>
  );
};

export default Posts;
