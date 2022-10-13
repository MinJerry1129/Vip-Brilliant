import { StyleSheet } from "react-native";

export default StyleSheet.create({
    avatarContainer: {
        flexDirection: 'row',
        position: 'relative'
    },
    itemContainer: {
        flexDirection: 'row',
        paddingVertical: 10,
        marginHorizontal: 20,
    },
    itemRecentContainer:{
        paddingVertical: 10,
        marginHorizontal: 10,
        alignItems:'center'
    },
    itemContent: {
        justifyContent: 'flex-start',
        flexGrow: 1,
        flex:1,
        marginLeft: 8
    },
    itemHeader: {
        marginTop: 4,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between'
    },
    itemFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    unreadContainer: {
        position: 'absolute',
        top: 0,
        right: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1d74f5',
        borderRadius: 8,
        minWidth: 16,
        minHeight: 16
    },
    unread: {
        color: 'white',
        fontSize: 12
    },
    itemImage: {
        width: 48,
        height: 48,
        borderRadius: 24
    },
    itemTitle: {
        fontWeight: 'bold'
    },
    itemMessage: {

    },
    itemTime: {
        fontSize: 10
    },
    emptyContainer: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    emptyText:{
        fontSize: 20,
        fontWeight: 'bold'
    },
    userlistMainView:{
        display:'flex',
        flex:1
    },
    userlistView:{
        backgroundColor:'#E6EEFA',
        flex:1,
        borderTopLeftRadius:30,
        borderTopRightRadius:30,
        paddingTop:20
    },
    recentuserlist:{
        height:110
    },
    recentText:{
        color:"#5A5A5A",
        marginTop:5,
        marginLeft:5
    }
});