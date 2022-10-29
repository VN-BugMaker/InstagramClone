import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';

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

})