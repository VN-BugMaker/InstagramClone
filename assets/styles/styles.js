import { Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  headerWrap: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 5,
    alignItems: 'center',
    // borderBottomWidth: 1,
    // borderBottomColor: "#efefef",
    // shadowColor: '#fafafa',
    shadowOffset: { height: 1 }
  },
  titleWrapper: {
    // fontFamily: "Lobster-Regular",
    fontSize: 25,
    fontWeight: '500'
  },
  titleWrapperRight: {
    flexDirection: 'row',
    paddingRight: 8
  },
  storyWrapper: {
    paddingVertical: 9,
    borderBottomWidth: 1,
    borderBottomColor: '#efefef',
    shadowColor: '#efefef'
  },

  avatarPost: {
    width: 32,
    height: 32,
    borderRadius: 32
  },
  headerPost: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginTop: 11
  },
  optionPost: {
    marginStart: 304
  },
  infoPost: {
    left: 10
  },
  nameUser: {
    fontSize: 15,
    fontWeight: '400',
    color: 'black'
  },
  imagePost: {
    height: 375,
    width: width,
    marginTop: 11
  },
  interactPost: {
    flexDirection: 'row',
    marginHorizontal: 14,
    marginVertical: 13.5,
    justifyContent: 'space-between'
  },
  likePost: {
    flexDirection: 'row',
    paddingRight: 17
  },
  commentPost: {
    paddingHorizontal: 17
  },
  pgPost: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  savePost: {},
  detailLike: {
    paddingHorizontal: 12,
    fontWeight: 'bold',
    color: '#262626'
  },
  titlePost: {
    paddingHorizontal: 15,
    fontSize: 15,
    flexDirection: 'row',
    paddingVertical: 1
  },
  titleName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#262626'
  },
  title: {
    paddingLeft: 3,
    fontSize: 14
  },
  seenComment: {
    opacity: 0.6,
    fontSize: 14,
    paddingLeft: 15,
    paddingBottom: 12
  },
  pagination: {
    width: 34,
    height: 26,
    backgroundColor: '#121212',
    opacity: 0.7,
    position: 'absolute',
    right: 14,
    top: 69,
    borderRadius: 13,
    justifyContent: 'center',
    alignItems: 'center'
  },
  paginationNumber: {
    color: '#F9F9F9'
  }
});
