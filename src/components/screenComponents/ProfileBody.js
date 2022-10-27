import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { MorePeople, MorePeopleClick } from '../../svg-view';

export const ProfileBody = ({ name, imageProfile, post, follower, following, accountName }) => {
    return (
        <View>
            {

                <View style={styles.container}>
                    <View style={styles.leftContainer}>
                        <Image source={imageProfile} style={styles.imageProfile} />
                        <Text style={styles.nameProfile}>
                            {accountName}
                        </Text>
                    </View>
                    <View style={styles.rightContainer}>
                        <Text style={styles.text}>{post}</Text>
                        <Text>Bài viết</Text>
                    </View>
                    <View style={styles.rightContainer}>
                        <Text style={styles.text}>{follower}</Text>
                        <Text>Người theo dõi</Text>
                    </View>
                    <View style={styles.rightContainer}>
                        <Text style={styles.text}>{following}</Text>
                        <Text>Đang theo dõi</Text>
                    </View>
                </View>

            }

        </View>
    )
}

export const FollowButton = ({ id }) => {
    const [follow, setFollow] = useState(follow)
    return (
        <View>
            {
                id === 0 ? null : (
                    <View style={styles.containerFollow}>
                        <TouchableOpacity onPress={() => setFollow(!follow)} style={{ width: follow ? 170 : 170 }}>
                            <View style={{
                                backgroundColor: follow ? '#efefef' : '#0095f6',
                                width: '100%',
                                height: 30,
                                borderRadius: 9,
                                justifyContent: 'center',
                                alignItems: 'center'

                            }}>
                                <Text style={{
                                    color: follow ? '#000000' : '#ffffff',
                                    fontWeight: 'bold',
                                    fontSize: 14
                                }}>
                                    {follow ? 'Đang theo dõi' : 'Theo dõi'}
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <View style={styles.buttonMessage}>
                            <Text>Nhắn tin</Text>
                        </View>
                        <View style={styles.addFollow}>
                            <MorePeople />
                        </View>
                    </View>
                )

            }
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingVertical: 20
    },
    leftContainer: {
        alignItems: 'center'
    },
    rightContainer: {
        alignItems: 'center'
    },
    imageProfile: {
        width: 83,
        height: 83,
        borderRadius: 100
    },
    nameProfile: {
        paddingVertical: 5,
        fontWeight: 'bold'
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold'
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
    }

})