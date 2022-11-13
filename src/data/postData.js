const postData = [
  {
    id: 1,
    name: 'Hung',
    avatar: require('../storage/images/avatar/1.png'),
    location: 'Da Nang',
    like: 123,
    clickLike: true,
    title: 'Tuần mới của bạn thế nào',
    comment: 10,
    postImage: [
      {
        idUser: 1,
        idPost: 1,
        image: require('../storage/images/avatar/2.png')
      },
      {
        idUser: 1,
        idPost: 2,
        image: require('../storage/images/avatar/3.png')
      },
      {
        idUser: 1,
        idPost: 3,
        image: require('../storage/images/avatar/4.png')
      },
      {
        idUser: 1,
        idPost: 4,
        image: require('../storage/images/avatar/5.png')
      },
      {
        idUser: 1,
        idPost: 5,
        image: require('../storage/images/avatar/6.png')
      },
      {
        idUser: 1,
        idPost: 6,
        image: require('../storage/images/avatar/15.png')
      },
      {
        idUser: 1,
        idPost: 7,
        image: require('../storage/images/avatar.jpg')
      }
    ]
  },
  {
    id: 2,
    name: 'Hung 1',
    avatar: require('../storage/images/avatar/8.png'),
    location: 'Da Nang',
    like: 456,
    clickLike: false,
    title: 'Chúc bạn một ngày thật tuyệt vời',
    comment: 4,
    postImage: [
      {
        idUser: 2,
        idPost: 1,
        image: require('../storage/images/avatar/9.png')
      },
      {
        idUser: 2,
        idPost: 2,
        image: require('../storage/images/avatar/10.png')
      },
      {
        idUser: 2,
        idPost: 3,
        image: require('../storage/images/avatar/11.png')
      },
      {
        idUser: 2,
        idPost: 4,
        image: require('../storage/images/avatar/12.png')
      }
    ]
  }
];
export default postData;
