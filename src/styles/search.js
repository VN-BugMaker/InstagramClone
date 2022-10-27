import { StyleSheet } from "react-native";

export const search = StyleSheet.create({
    component: {
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 10,
        position: "relative",
    },
    itemSearch: {
        position: "absolute",
        zIndex: 1,
        left: 25
    },
    searchText: {
        width: '94%',
        backgroundColor: '#EBEBEB',
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        fontSize: 15,
        padding: 4,
        paddingLeft: 40
    },
    mainContent: {
        flexDirection:"row",
        flexWrap:"wrap",
        justifyContent:'space-between'
    },
    contentImage: {
        paddingBottom: 1,
    },
    imageContent: {
        width: 140,
        height: 124,
    },

})