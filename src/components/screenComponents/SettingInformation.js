import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const SettingInformation = ({route,navigation}) => {
    const {mails,phone,birthDay} = route.params;
  return (
    <View navigation={navigation}>
      <Text>{mails}</Text>
    </View>
  )
}

export default SettingInformation

const styles = StyleSheet.create({})