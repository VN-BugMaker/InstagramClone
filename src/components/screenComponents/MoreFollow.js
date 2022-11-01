import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { followData } from '../../data/followData';
import ButtonFollow from './ButtonFollow';
import { MorePeople, MorePeopleClick } from '../../svg-view';
import { useNavigation } from '@react-navigation/native';

const MoreFollow = ({ id, message, idUser = 2, name, imageProfile, accountName }) => {
    const navigation = useNavigation();
    const [close, setClose] = useState(false);
    const [moreFollow, setMoreFollow] = useState(false);
    return (
        <View>
            <View>
                <View style={styles.containerFollow}>
                    {
                        message ? (
                            <>
                                <ButtonFollow width={170} />
                                <TouchableOpacity activeOpacity={0.7} style={styles.buttonMessage}>
                                    <Text>Nhắn tin</Text>
                                </TouchableOpacity>
                            </>
                        ) : (
                            <>
                                <TouchableOpacity activeOpacity={0.7} style={styles.buttonEditProfile}
                                    onPress={() => navigation.push('EditProfile', {
                                        name: name,
                                        imageProfile: imageProfile,
                                        accountName: accountName,
                                    })}
                                >
                                    <Text>Chỉnh sửa trang cá nhân</Text>
                                </TouchableOpacity>
                            </>
                        )
                    }


                    <TouchableOpacity activeOpacity={1} onPress={() => setMoreFollow(!moreFollow)} style={styles.addFollow}>
                        {moreFollow ? <MorePeopleClick /> : <MorePeople />}
                    </TouchableOpacity>
                </View>
            </View>
            {
                moreFollow ? (
                    <View>
                        <Text style={styles.textSuggest}>Gợi ý cho bạn</Text>
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                        >
                            {
                                followData.map((item, index) => {
                                    return (
                                        <View key={index} style={{ marginLeft: 6 }}>
                                            {
                                                item.id === id || item.id === idUser || close ? null : (
                                                    <TouchableOpacity activeOpacity={1} onPress={() => navigation.push('FriendProfile', {
                                                        id: item.id,
                                                        name: item.name,
                                                        image: item.profileImage,
                                                        follower: item.followers,
                                                        following: item.following,
                                                        post: item.posts,
                                                        accountName: item.accountName
                                                    })}>
                                                        <View style={styles.insideSuggestItem}>
                                                            <TouchableOpacity onPress={() => setClose(true)} style={styles.close}>
                                                                <AntDesign name='close' style={styles.buttonClose} />
                                                            </TouchableOpacity>
                                                            <Image source={item.profileImage} style={styles.imageItemSuggest} />
                                                            <Text style={styles.textName}>{item.name}</Text>
                                                            <Text style={styles.textAccountName}>{item.accountName}</Text>
                                                            <View style={styles.buttonFollow}>
                                                                <ButtonFollow width={136} />
                                                            </View>

                                                        </View>
                                                    </TouchableOpacity>
                                                )
                                            }
                                        </View>
                                    )
                                })
                            }
                        </ScrollView>
                    </View>
                ) : null
            }
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        padding: 10
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    arrowBack: {
        fontSize: 30,
    },
    moreVertical: {
        fontSize: 19,
    },
    nameProfile: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 29
    },
    insideHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: "90%",
    },
    textSuggest: {
        fontWeight: '500',
        paddingTop: 25,
        paddingHorizontal: 10
    },
    listSuggest: {
        paddingTop: 10
    },
    buttonClose: {
        fontSize: 18,
        opacity: 0.5
    },
    close: {
        position: 'absolute',
        top: 7,
        right: 7,
    },
    insideSuggestItem: {
        width: 155,
        height: 200,
        margin: 2,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0.3,
        borderRadius: 3,
        borderColor: '#DEDEDE'
    },
    imageItemSuggest: {
        width: 90,
        height: 90,
        borderRadius: 100,
        marginTop: 12
    },
    textName: {
        fontWeight: '600',
        fontSize: 13,
        marginTop: 10
    },
    textAccountName: {
        fontSize: 12,
        opacity: 0.6
    },
    buttonFollow: {
        marginTop: 13
    },
    containerFollow: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    buttonMessage: {
        backgroundColor: '#efefef',
        width: '42%',
        height: 30,
        borderRadius: 9,
        justifyContent: 'center',
        alignItems: 'center'
    },
    addFollow: {
        backgroundColor: '#efefef',
        width: '8%',
        height: 30,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonEditProfile: {
        backgroundColor: '#efefef',
        width: '83%',
        height: 30,
        borderRadius: 9,
        justifyContent: 'center',
        alignItems: 'center'
    },
})

export default MoreFollow