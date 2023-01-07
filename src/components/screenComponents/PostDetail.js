import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import React, { useContext, useEffect, useRef, useState } from 'react';
import styles from '../../../assets/styles/styles';
import {
  Comment_SVG,
  Heart_SVG,
  Heart_SVG_Cli,
  Options_SVG,
  Share_SVG,
  Save_SVG
} from '../../svg-view';
import { AuthContext } from '../../context/AuthContext';
import Ionic from 'react-native-vector-icons/Ionicons';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetBackdrop
} from '@gorhom/bottom-sheet';
import { URL } from './api/Url';

const PostDetail = ({ route, navigation }) => {
  const { id } = route.params;
  const [postDetails, setPostDetails] = useState(postDetails);
  const [loading, setLoading] = useState(true);
  const { idUser, userToken, avatarUser } = useContext(AuthContext);
  const [isLoadLike, setIsLoadLike] = useState(isLoadLike);
  const bottomSheetRef = useRef(null);
  const snapPoints = ['50%'];
  const handleSheetChanges = (index) => {
    bottomSheetRef.current?.present();
  };

  useEffect(() => {
    const loadPostDetail = async () => {
      setLoading(true);
      await fetch(`${URL}/api/post/${id}`, {
        method: 'GET',
        headers: { Authorization: userToken }
      })
        .then((res) => res.json())
        .then((res) => {
          setPostDetails(res.post);
          setLoading(false);
        });
    };
    loadPostDetail();
  }, [isLoadLike]);
  const likePost = (idPost) => {
    fetch(`${URL}/api/post/${idPost}/like`, {
      method: 'PATCH',
      headers: { Authorization: userToken }
    });
  };
  const unlikePost = (idPost) => {
    fetch(`${URL}/api/post/${idPost}/unlike`, {
      method: 'PATCH',
      headers: { Authorization: userToken }
    });
  };
  const handleLike = () => {
    likePost(postDetails._id);
    setIsLoadLike(!isLoadLike);
  };
  const handleUnLike = () => {
    unlikePost(postDetails._id);
    setIsLoadLike(!isLoadLike);
  };
  return (
    <BottomSheetModalProvider>
      <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            padding: 10
          }}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionic
              name="arrow-back"
              style={{
                fontSize: 30
              }}
            />
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '90%'
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                marginLeft: 29
              }}
            >
              Bài Viết
            </Text>
          </View>
        </View>

        {loading ? null : (
          <View>
            <View style={styles.headerPost}>
              <Image
                source={{
                  uri: postDetails.user.avatar
                }}
                style={styles.avatarPost}
                resizeMethod={'resize'}
              />
              <View style={styles.infoPost}>
                <Text style={styles.nameUser}>{postDetails.user.username}</Text>
              </View>
              <View style={styles.optionPost}>
                <TouchableOpacity
                  style={{ height: 18 }}
                  onPress={handleSheetChanges}
                >
                  <Options_SVG />
                </TouchableOpacity>
              </View>
            </View>
            <View>
              {postDetails.images.map((item, index) => {
                return (
                  <Image
                    key={index}
                    source={{
                      uri: item.uri ? item.uri : item.url ? item.url : item
                    }}
                    style={styles.imagePost}
                    resizeMethod={'resize'}
                  />
                );
              })}
            </View>
            {/* {item.images.length > 1 ? (
          <View style={styles.pagination}>
            <Text style={styles.paginationNumber}>
              {idItem + 1}/{item.images.length}
            </Text>
          </View>
        ) : null} */}

            <View style={styles.interactPost}>
              <View style={styles.likePost}>
                {postDetails.likes.find((item) => item._id === idUser) ? (
                  <TouchableOpacity onPress={() => handleUnLike()}>
                    <Heart_SVG_Cli like="like" />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity onPress={() => handleLike()}>
                    <Heart_SVG handleLike />
                  </TouchableOpacity>
                )}
                {console.log(
                  postDetails.likes.find((item) => {
                    return item._id === idUser;
                  })
                )}

                <TouchableOpacity
                  onPress={() =>
                    navigation.push('Comments', {
                      id: postDetails._id,
                      content: postDetails.content,
                      userPost: postDetails.user.username,
                      avatarUser: avatarUser
                    })
                  }
                  style={styles.commentPost}
                >
                  <Comment_SVG />
                </TouchableOpacity>
                <Share_SVG />
              </View>
              <View style={styles.pgPost}></View>
              <View style={styles.savePost}>
                <Save_SVG />
              </View>
            </View>
            <View>
              <Text style={styles.detailLike}>
                {postDetails.likes.length} lượt thích
              </Text>
            </View>
            <View style={styles.titlePost}>
              <Text style={styles.titleName}>{postDetails.user.username}</Text>
              <Text style={styles.title}>{postDetails.content}</Text>
            </View>
            <TouchableOpacity
              onPress={() =>
                navigation.push('Comments', {
                  id: postDetails._id,
                  content: postDetails.content,
                  userPost: postDetails.user.username,
                  avatarUser: avatarUser
                })
              }
            >
              <Text style={styles.seenComment}>
                Xem tất cả {postDetails.comments.length} bình luận
              </Text>
            </TouchableOpacity>
            <BottomSheetModal
              ref={bottomSheetRef}
              index={0}
              snapPoints={snapPoints}
              backdropComponent={(props) => (
                <BottomSheetBackdrop
                  {...props}
                  disappearsOnIndex={-1}
                  appearsOnIndex={0}
                />
              )}
            >
              {postDetails.user._id === idUser ? (
                <View>
                  <TouchableOpacity>
                    <Text>Chỉnh sửa</Text>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Text>Xóa</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View>
                  <TouchableOpacity>
                    <Text>Theo doix</Text>
                  </TouchableOpacity>
                </View>
              )}
            </BottomSheetModal>
          </View>
        )}
      </View>
    </BottomSheetModalProvider>
  );
};

export default PostDetail;
