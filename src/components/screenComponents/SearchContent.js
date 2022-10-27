import { View, Text, TouchableOpacity, Image, Dimensions, StyleSheet } from 'react-native';
import React from 'react';
import searchData from '../../data/searchData';
const SearchContent = () => {
    return (
        <View>
            {
                searchData.map((data) => {
                    return (
                        <View key={data.id}>
                            {
                                data.id === 0 ? null :
                                    (
                                        <View style={{
                                            flexDirection: "row",
                                            flexWrap: "wrap",
                                        }}>
                                            {data.image.map((image,index) => {
                                                return (
                                                    <TouchableOpacity key={index.toString()} style={styles.contentImage}>
                                                        <Image source={image} style={styles.imageContent} />
                                                    </TouchableOpacity>

                                                )
                                            })
                                            }
                                        </View>)
                            }
                            {
                                data.id === 1 ? (
                                    <View style={{
                                        flexDirection: "row",
                                        justifyContent: 'space-between',
                                    }}>
                                        <View style={{
                                            flexDirection: "row",
                                            flexWrap: "wrap",
                                            justifyContent: 'space-between',
                                            width: 282
                                        }}>
                                            {
                                                data.image.slice(0, 4).map((imageData,index) => {
                                                    return (
                                                        <TouchableOpacity key={index.toString()} style={styles.contentImage}>
                                                            <Image source={imageData} style={styles.imageContent} />
                                                        </TouchableOpacity>
                                                    )
                                                })
                                            }
                                        </View>
                                        <TouchableOpacity key={data.id.toString()}  style={styles.contentImage}>
                                            <Image source={data.image[4]} style={{
                                                width: 140,
                                                height: 248
                                            }} />
                                        </TouchableOpacity>
                                        
                                    </View>
                                ) : null
                            }

                        </View>
                    )
                })
            }
        </View>
    )
}
export const styles = StyleSheet.create({
    mainContent: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: 'space-between'
    },
    contentImage: {
        paddingBottom: 1,
    },
    imageContent: {
        width: 140,
        height: 124,
    }
})

export default SearchContent