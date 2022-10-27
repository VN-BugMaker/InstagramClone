import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, } from 'react-native';
import React, { useState, useRef, } from 'react';
import postData from '../../data/postData';
import { Comment_SVG, Heart_SVG, Heart_SVG_Cli, Options_SVG, Save_SVG, Share_SVG } from '../../svg-view';
import styles from '../../../assets/styles/styles';

const Posts = () => {
    const [data, setData] = useState(postData)
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const [isRender, setIsRender] = useState();
    const onViewableItemsChanged = useRef((item) => {
        setCurrentSlideIndex(item.viewableItems[0].index)

        console.log(item.viewableItems[0].index)
    });

    const viewabilityConfig = useRef({
        itemVisiblePercentThreshold: 50
    });

    const renderImage = ({ item }) => {
        return (
            <Image source={item.image} style={styles.imagePost} />
        )
    }

    const onChangeLike = (item) => {
        const newData = data.map(newItem => {
            if (newItem.id === item.id) {
                item.clickLike = !item.clickLike
                return newItem
            }
            return newItem
        })
        setData(newData)
        setIsRender(!isRender)
    }
    const renderPost = ({ item }) => {
        return (
            <View>
                <View style={styles.headerPost}>
                    <Image source={item.avatar} style={styles.avatarPost} />
                    <View style={styles.infoPost}>
                        <Text style={styles.nameUser}>{item.name}</Text>
                    </View>
                    <View style={styles.optionPost}>
                        <Options_SVG />
                    </View>
                </View>
                <View>
                    <FlatList
                        data={item.postImage}
                        renderItem={renderImage}
                        horizontal
                        pagingEnabled
                        keyExtractor={data => data.idPost}
                        showsHorizontalScrollIndicator={false}
                        onViewableItemsChanged={onViewableItemsChanged.current}
                        viewabilityConfig={viewabilityConfig.current}

                    />
                </View>
                <View style={styles.pagination}>
                    <Text style={styles.paginationNumber}>{currentSlideIndex + 1}/{item.postImage.length}</Text>
                </View>
                <View style={styles.interactPost}>
                    <View style={styles.likePost}>
                        <TouchableOpacity onPress={() => onChangeLike(item)}>
                            {item.clickLike === true ? <Heart_SVG_Cli like='like' /> : <Heart_SVG />}
                        </TouchableOpacity>
                        <View style={styles.commentPost}>
                            <Comment_SVG />
                        </View>
                        <Share_SVG />
                    </View>
                    <View style={styles.pgPost}>
                        {
                            item.postImage.map((item, index) => {
                                return (
                                    <View
                                        key={item.idPost}
                                        style={{
                                            width: currentSlideIndex === index ? 6 : 4,
                                            height: currentSlideIndex === index ? 6 : 4,
                                            borderRadius: 3,
                                            backgroundColor: currentSlideIndex === index ? "#3897F0" : 'black',
                                            opacity: currentSlideIndex === index ? 1 : 0.15,
                                            marginHorizontal: 2
                                        }}
                                    >
                                    </View>
                                 )
                            })
                        } 
                    </View>
                    <View style={styles.savePost}>
                        <Save_SVG />
                    </View>
                </View>
                <View>
                    <Text style={styles.detailLike}> {item.like} lượt thích</Text>
                </View>
                <View style={styles.titlePost}>
                    <Text style={styles.titleName}>{item.name}</Text>
                    <Text style={styles.title}>{item.title}</Text>
                </View>
                <Text style={styles.seenComment}>Xem tất cả {item.comment} bình luận</Text>
            </View>
        )
    }
    return (
        <View>
            <FlatList
                data={data}
                horizontal={false}
                renderItem={renderPost}
                keyExtractor={data => data.id}
                extraData={isRender}
                showsVerticalScrollIndicator={false}
                scrollEnabled={false}
            />
        </View>
    )
}

export default Posts;