import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';
import React, { useContext, useEffect, useRef, useState } from 'react';
import Ionic from 'react-native-vector-icons/Ionicons';
import { Heart_SVG, Heart_SVG_Cli, Share_SVG } from '../../svg-view';
import { AuthContext } from '../../context/AuthContext';
import { ScrollView } from 'react-native-virtualized-view';
import axios from 'axios';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Comments = ({ route, navigation }) => {
  const [like, setLike] = useState(like);
  const [comment, setComment] = useState();
  const [replyCmt, setReplyCmt] = useState([]);
  const [reloadComment, setReloadComment] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [reply, setReply] = useState('');
  const [data, setData] = useState();
  const { id, content, userPost, avatarUser } = route.params;
  const { userToken, idUser } = useContext(AuthContext);
  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 100);
  };

  const replyFocus = useRef();
  const replyComment = (reply) => {
    replyFocus.current.focus();
    setReply(reply);
  };

  const handleComment = () => {
    commentPost(idUser, comment, reply, idUser, id);
    setReloadComment(!reloadComment);
  };
  const commentPost = async (user, content, reply, postUserId, postId) => {
    setComment('');
    await axios
      .post(
        'http://192.168.0.38:5000/api/comment',
        reply
          ? { user, content, reply, postUserId, postId }
          : { user, content, postUserId, postId },
        {
          headers: { Authorization: userToken }
        }
      )
      .then(() => {
        console.log('Comment Success');
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    console.log('hello');
    const loadComment = async () => {
      await fetch(`http://192.168.0.38:5000/api/post/${id}`, {
        method: 'GET',
        headers: { Authorization: userToken }
      })
        .then((res) => res.json())
        .then((res) => {
          setData(
            res.post.comments.map((item) => {
              return item;
            })
          );
          setReplyCmt(
            res.post.comments.filter((item) => {
              return item.reply;
            })
          );
        });
    };
    loadComment();
  }, [reloadComment]);

  const renderItem = ({ item }) => {
    return (
      <View style={{ flex: 1 }}>
        {!item.reply && (
          <View style={styles.comment}>
            <View style={styles.left}>
              <Image style={styles.avatar} source={{ uri: item.user.avatar }} />
            </View>
            <View style={styles.right}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.username}>{item.user.username}</Text>
                <Text style={styles.textTime}>12 giờ</Text>
              </View>
              <View style={styles.content}>
                <Text style={styles.textContent}>{item.content}</Text>
              </View>
              <View style={styles.reply}>
                <TouchableOpacity
                  onPressIn={() => {
                    replyComment(item._id);
                  }}
                  hitSlop={{ top: 100, bottom: 100, left: 100, right: 100 }}
                >
                  <Text style={styles.textReply}>Trả lời</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={styles.textReply}>Gửi</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.buttonLike}>
              <TouchableOpacity onPress={() => setLike(!like)}>
                {like ? (
                  <Heart_SVG_Cli like={'likeComment'} />
                ) : (
                  <Heart_SVG heartComment={'heartComment'} />
                )}
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={[styles.textReply, { marginLeft: 5 }]}>
                  {!item.likes.length ? null : item.likes.length}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        {/* ReplyComment */}
        {replyCmt.map((reply, index) => {
          return (
            reply.reply === item._id && (
              <View
                key={index}
                style={{
                  flexDirection: 'row',
                  paddingHorizontal: 10,
                  width: '85%',
                  marginTop: 20,
                  marginLeft: 50
                }}
              >
                <View style={styles.left}>
                  <Image
                    style={{ width: 35, height: 35, borderRadius: 40 }}
                    source={{ uri: reply.user.avatar }}
                  />
                </View>
                <View style={styles.right}>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.username}>{reply.user.username}</Text>
                    <Text style={styles.textTime}>12 giờ</Text>
                  </View>
                  <View style={{ width: 256 }}>
                    <Text style={styles.textContent}>{reply.content}</Text>
                  </View>
                  <View style={styles.reply}>
                    <TouchableOpacity
                      onPressIn={() => {
                        replyComment(reply._id);
                      }}
                    >
                      <Text style={styles.textReply}>Trả lời</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <Text style={styles.textReply}>Gửi</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.buttonLike}>
                  <TouchableOpacity onPress={() => setLike(!like)}>
                    {like ? (
                      <Heart_SVG_Cli like={'likeComment'} />
                    ) : (
                      <Heart_SVG heartComment={'heartComment'} />
                    )}
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Text style={[styles.textReply, { marginLeft: 5 }]}>
                      {!reply.likes.length ? null : reply.likes.length}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )
          );
        })}
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
        <View style={styles.insideHeader}>
          <Text style={styles.titleComment}>Bình luận</Text>
          <View>
            <Share_SVG />
          </View>
        </View>
      </View>
      <ScrollView
        refreshing={refreshing}
        onRefresh={onRefresh}
        showsVerticalScrollIndicator
      >
        <View style={[styles.comment, { marginBottom: 10 }]}>
          <View style={styles.left}>
            <Image style={styles.avatar} source={{ uri: avatarUser }} />
          </View>
          <View style={styles.right}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.username}>{userPost}</Text>
              <Text style={styles.textTime}>12 giờ</Text>
            </View>
            <View style={styles.content}>
              <Text style={styles.textContent}>{content}</Text>
            </View>
          </View>
        </View>
        <View
          style={{
            width: '100%',
            backgroundColor: 'rgba(1,1,1,0.2)',
            height: 0.5,
            marginTop: 4
          }}
        ></View>

        {/* Comment */}

        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item, index) => String(index)}
        />
      </ScrollView>
      <View
        style={{
          flexDirection: 'row',
          height: 60,
          alignItems: 'center',
          paddingBottom: 15
        }}
      >
        <View style={{ paddingHorizontal: 15 }}>
          <Image
            style={{ width: 35, height: 35, borderRadius: 35 }}
            source={{ uri: avatarUser }}
          />
        </View>
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
            width: '82%'
          }}
        >
          <TextInput
            style={{ width: '87%' }}
            ref={replyFocus}
            blurOnSubmit={true}
            multiline={true}
            value={comment}
            numberOfLines={3}
            placeholder="Bình Luận với vai trò Name..."
            onChangeText={(text) => setComment(text)}
            autoFocus
          />
          <TouchableOpacity disabled={!comment} onPress={handleComment}>
            <Text style={{ color: '#0f9bf6', opacity: comment ? 1 : 0.4 }}>
              Đăng
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Comments;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    width: '100%',
    height: '100%'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    paddingHorizontal: 10
  },
  arrowBack: {
    fontSize: 30
  },
  moreVertical: {
    fontSize: 19
  },
  titleComment: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 29
  },
  insideHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%'
  },
  left: {
    marginTop: 5
  },
  right: {
    paddingHorizontal: 10
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 40
  },
  comment: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    width: '100%',
    marginTop: 20
  },
  reply: {
    flexDirection: 'row'
  },
  content: {
    width: 300
  },
  textContent: {
    textAlign: 'left',
    fontSize: 14
  },
  username: {
    fontWeight: 'bold',
    fontSize: 13,
    marginRight: 5
  },
  textReply: {
    fontSize: 12,
    marginRight: 15,
    marginTop: 5
  },
  textTime: {
    fontSize: 13,
    marginRight: 5,
    opacity: 0.6
  },
  buttonLike: {
    marginLeft: 10
  }
});
