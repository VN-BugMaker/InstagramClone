import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

const ButtonFollow = ({ width }) => {
    const [follow, setFollow] = useState(follow);
    return (
        <View>
            <TouchableOpacity onPress={() => setFollow(!follow)} style={{ width: follow ? width : width }}>
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
        </View>
    )
}

export default ButtonFollow